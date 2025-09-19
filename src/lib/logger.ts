/**
 * Logger centralizzato per gestire i log in modo sicuro e strutturato
 * Segue le best practices per security e compliance GDPR
 */

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export type LogContext = {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  duration?: number;
  [key: string]: unknown;
};

export type LogEntry = {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
};

/**
 * Sanitizza i dati rimuovendo informazioni sensibili (PII)
 */
const sanitizeData = (data: unknown): unknown => {
  if (!data || typeof data !== 'object') return data;
  
  const sensitiveKeys = ['password', 'token', 'secret', 'key', 'authorization', 'cookie'];
  const sanitized = { ...data as Record<string, unknown> };
  
  Object.keys(sanitized).forEach(key => {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
    }
  });
  
  return sanitized;
};

/**
 * Crea un log entry strutturato
 */
const createLogEntry = (
  level: LogLevel, 
  message: string, 
  context?: LogContext, 
  error?: unknown
): LogEntry => {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context: context ? sanitizeData(context) as LogContext : undefined,
  };

  if (error) {
    if (error instanceof Error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
    } else {
      entry.error = {
        name: 'UnknownError',
        message: String(error),
      };
    }
  }

  return entry;
};

/**
 * Invia log a servizio esterno (Sentry, LogRocket, etc.)
 * TODO: Implementare integrazione con servizio di monitoring
 */
const sendToExternalService = (entry: LogEntry): void => {
  // In produzione, integrare con Sentry, LogRocket, DataDog, etc.
  // Per ora manteniamo console.error per non perdere log critici
  if (entry.level === 'error' && process.env.NODE_ENV === 'production') {
    console.error(JSON.stringify(entry));
  }
};

export const logger = {
  error: (message: string, context?: LogContext, error?: unknown) => {
    const entry = createLogEntry('error', message, context, error);
    
    if (process.env.NODE_ENV === 'development') {
      console.error('🔴', entry.message, entry.context, entry.error);
    } else {
      sendToExternalService(entry);
    }
  },

  warn: (message: string, context?: LogContext) => {
    const entry = createLogEntry('warn', message, context);
    
    if (process.env.NODE_ENV === 'development') {
      console.warn('🟡', entry.message, entry.context);
    } else {
      sendToExternalService(entry);
    }
  },

  info: (message: string, context?: LogContext) => {
    const entry = createLogEntry('info', message, context);
    
    if (process.env.NODE_ENV === 'development') {
      console.info('🔵', entry.message, entry.context);
    }
  },

  debug: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      const entry = createLogEntry('debug', message, context);
      console.debug('⚪', entry.message, entry.context);
    }
  },

  /**
   * Helper per loggare richieste API con metriche
   */
  apiRequest: (
    method: string,
    endpoint: string,
    statusCode: number,
    duration: number,
    context?: Omit<LogContext, 'method' | 'endpoint' | 'statusCode' | 'duration'>
  ) => {
    const level: LogLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    const message = `${method} ${endpoint} - ${statusCode} (${duration}ms)`;
    
    const fullContext: LogContext = {
      ...context,
      method,
      endpoint,
      statusCode,
      duration,
    };

    logger[level](message, fullContext);
  },
};
