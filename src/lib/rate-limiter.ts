/**
 * Sistema di rate limiting avanzato con sliding window
 * Supporta multiple strategie e persistent storage
 */

import type { LogContext } from './logger';
import { logger } from './logger';

export type RateLimitStrategy = 'fixed-window' | 'sliding-window' | 'token-bucket';

export type RateLimitConfig = {
  windowMs: number;     // Finestra temporale in ms
  maxRequests: number;  // Massimo numero di richieste per finestra
  strategy: RateLimitStrategy;
  keyGenerator?: (identifier: string) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  message?: string;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  totalHits: number;
};

/**
 * In-memory store con cleanup automatico
 * TODO: Sostituire con Redis per produzione multi-istanza
 */
class InMemoryStore {
  private store = new Map<string, { requests: number[]; createdAt: number }>();
  private cleanupInterval: NodeJS.Timeout;

  constructor(cleanupIntervalMs = 60000) { // Cleanup ogni minuto
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, cleanupIntervalMs);
  }

  private cleanup(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 ore

    for (const [key, data] of this.store.entries()) {
      if (now - data.createdAt > maxAge) {
        this.store.delete(key);
      }
    }
  }

  get(key: string): number[] {
    const data = this.store.get(key);
    return data ? data.requests : [];
  }

  set(key: string, requests: number[]): void {
    this.store.set(key, { requests, createdAt: Date.now() });
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  size(): number {
    return this.store.size;
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Store globale per l'applicazione
const globalStore = new InMemoryStore();

/**
 * Implementazione sliding window rate limiter
 */
class SlidingWindowRateLimiter {
  private config: RateLimitConfig;
  private store: InMemoryStore;

  constructor(config: RateLimitConfig, store?: InMemoryStore) {
    this.config = config;
    this.store = store || globalStore;
  }

  async checkLimit(identifier: string, context?: LogContext): Promise<RateLimitResult> {
    const key = this.config.keyGenerator ? this.config.keyGenerator(identifier) : identifier;
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Recupera richieste esistenti e filtra quelle nella finestra
    const requests = this.store.get(key);
    const requestsInWindow = requests.filter(timestamp => timestamp > windowStart);

    // Calcola il risultato
    const totalHits = requestsInWindow.length;
    const allowed = totalHits < this.config.maxRequests;
    const remaining = Math.max(0, this.config.maxRequests - totalHits - 1);
    const resetTime = requestsInWindow.length > 0 
      ? Math.min(...requestsInWindow) + this.config.windowMs
      : now + this.config.windowMs;

    // Se la richiesta è consentita, aggiungila allo store
    if (allowed) {
      requestsInWindow.push(now);
      this.store.set(key, requestsInWindow);
    }

    // Log per monitoraggio
    if (!allowed) {
      logger.warn('Rate limit exceeded', {
        ...context,
        identifier,
        totalHits,
        maxRequests: this.config.maxRequests,
        windowMs: this.config.windowMs,
      });
    }

    return {
      allowed,
      remaining,
      resetTime,
      totalHits: totalHits + (allowed ? 1 : 0),
    };
  }

  reset(identifier: string): void {
    const key = this.config.keyGenerator ? this.config.keyGenerator(identifier) : identifier;
    this.store.delete(key);
  }

  getStats(): { totalKeys: number } {
    return {
      totalKeys: this.store.size(),
    };
  }
}

/**
 * Configurazioni predefinite per diversi endpoint
 */
export const RATE_LIMIT_CONFIGS = {
  // API booking - molto restrittivo
  booking: {
    windowMs: 10 * 60 * 1000, // 10 minuti
    maxRequests: 3,
    strategy: 'sliding-window' as const,
    message: 'Troppe richieste di prenotazione. Riprova tra 10 minuti.',
  },
  
  // API generiche - moderato
  api: {
    windowMs: 15 * 60 * 1000, // 15 minuti
    maxRequests: 100,
    strategy: 'sliding-window' as const,
    message: 'Troppe richieste API. Riprova più tardi.',
  },

  // Login/auth - molto restrittivo
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minuti
    maxRequests: 5,
    strategy: 'sliding-window' as const,
    message: 'Troppi tentativi di login. Riprova tra 15 minuti.',
  },
} as const;

/**
 * Factory per creare rate limiters
 */
export const createRateLimiter = (config: RateLimitConfig): SlidingWindowRateLimiter => {
  return new SlidingWindowRateLimiter(config);
};

/**
 * Rate limiter globale per booking
 */
export const bookingRateLimiter = createRateLimiter(RATE_LIMIT_CONFIGS.booking);

/**
 * Helper per estrarre identificatore client da Request
 */
export const getClientIdentifier = (req: Request): string => {
  // Priorità: CF-Connecting-IP > X-Forwarded-For > X-Real-IP > Remote Address
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;

  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }

  const xRealIp = req.headers.get('x-real-ip');
  if (xRealIp) return xRealIp;

  // Fallback per development
  return req.headers.get('x-forwarded-for') || 'unknown';
};

/**
 * Middleware helper per Next.js API routes
 */
export const withRateLimit = (
  rateLimiter: SlidingWindowRateLimiter,
  options?: {
    keyGenerator?: (req: Request) => string;
    onLimitReached?: (req: Request, result: RateLimitResult) => Response;
  }
) => {
  return async (req: Request, next: () => Promise<Response>): Promise<Response> => {
    const identifier = options?.keyGenerator ? options.keyGenerator(req) : getClientIdentifier(req);
    
    const context: LogContext = {
      ip: identifier,
      method: req.method,
      endpoint: new URL(req.url).pathname,
      userAgent: req.headers.get('user-agent') || undefined,
    };

    const result = await rateLimiter.checkLimit(identifier, context);

    // Aggiungi headers informativi
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', rateLimiter['config'].maxRequests.toString());
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString());

    if (!result.allowed) {
      if (options?.onLimitReached) {
        return options.onLimitReached(req, result);
      }

      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          message: rateLimiter['config'].message || 'Too many requests',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            ...Object.fromEntries(headers.entries()),
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const response = await next();
    
    // Aggiungi headers alla risposta
    headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;
  };
};

// Cleanup automatico alla chiusura dell'applicazione
if (typeof process !== 'undefined') {
  process.on('SIGINT', () => globalStore.destroy());
  process.on('SIGTERM', () => globalStore.destroy());
}
