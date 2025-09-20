import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schema";
import { Resend } from "resend";
import { logger, type LogContext } from "@/lib/logger";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { bookingRateLimiter, getClientIdentifier } from "@/lib/rate-limiter";

// TODO: Rimuovere vecchio sistema rate limiting dopo test
// Sistema sostituito con rate-limiter.ts avanzato

const escapeHtml = (input: string): string =>
  input
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#39;");

const isAllowedOrigin = (req: Request): boolean => {
  const allowed = process.env.NEXT_PUBLIC_SITE_URL;
  if (!allowed) return true; // se non configurato, non blocchiamo (dev)
  const origin = req.headers.get("origin") ?? "";
  const referer = req.headers.get("referer") ?? "";
  return origin.startsWith(allowed) || referer.startsWith(allowed) || (origin === "" && referer === "");
};

const serviceLabelMap: Record<string, string> = {
  "detailing-interno": "Detailing Interno",
  "lucidatura-carrozzeria": "Lucidatura Carrozzeria",
  "paint-correction": "Paint Correction",
  "sanificazione-ozono": "Sanificazione Interni (Ozono)",
  "ceramic-coating": "Ceramic Coating",
  "ppf-wrapping": "PPF e Wrapping",
};

const getServiceLabel = (key: string): string => serviceLabelMap[key] ?? key;

const vehicleLabelMap: Record<string, string> = {
  car: "Auto",
  suv: "SUV",
  truck: "Camion",
  bike: "Moto",
};

const getVehicleLabel = (key: string): string => vehicleLabelMap[key] ?? key;

export async function POST(req: Request) {
  const startTime = Date.now();
  const clientId = getClientIdentifier(req);
  
  // Crea context per logging strutturato
  const logContext: LogContext = {
    ip: clientId,
    method: req.method,
    endpoint: '/api/booking',
    userAgent: req.headers.get('user-agent') || undefined,
  };

  try {
    // Origin/Referer check
    if (!isAllowedOrigin(req)) {
      logger.warn('Origin not allowed', {
        ...logContext,
        origin: req.headers.get('origin'),
        referer: req.headers.get('referer'),
      });
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Rate limit con sistema avanzato
    const rateLimitResult = await bookingRateLimiter.checkLimit(clientId, logContext);
    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      
      return NextResponse.json(
        { 
          error: "Too many requests",
          message: "Troppe richieste di prenotazione. Riprova tra qualche minuto.",
          retryAfter,
        }, 
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime / 1000).toString(),
            'Retry-After': retryAfter.toString(),
          },
        }
      );
    }

    // Payload guard (post-read, semplice)
    const bodyText = await req.text();
    if (bodyText.length > 50 * 1024) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    let json: unknown;
    try {
      json = JSON.parse(bodyText);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = bookingSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation error", issues: parsed.error.format() }, { status: 400 });
    }
    const data = parsed.data;

    // Honeypot → 204 No Content
    if (data.website && data.website.length > 0) {
      return new NextResponse(null, { status: 204 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }
    const resend = new Resend(apiKey);
    const toEmail = process.env.BOOKING_TO_EMAIL || "owner@example.com";
    const fromEmail = process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev";

    // Sanitizza tutti gli input prima di usarli
    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      vehicle: sanitizeInput(data.vehicle),
      service: sanitizeInput(data.service),
      date: sanitizeInput(data.date),
      time: sanitizeInput(data.time),
      notes: data.notes ? sanitizeInput(data.notes) : ""
    };

    const html = `
      <h2>Nuova richiesta prenotazione</h2>
      <p><strong>Nome:</strong> ${escapeHtml(sanitizedData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(sanitizedData.email)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(sanitizedData.phone)}</p>
      <p><strong>Veicolo:</strong> ${escapeHtml(getVehicleLabel(sanitizedData.vehicle))}</p>
      <p><strong>Servizio:</strong> ${escapeHtml(getServiceLabel(sanitizedData.service))}</p>
      <p><strong>Data/Ora:</strong> ${escapeHtml(sanitizedData.date)} ${escapeHtml(sanitizedData.time)}</p>
      <p><strong>Note:</strong> ${sanitizedData.notes ? escapeHtml(sanitizedData.notes) : "-"}</p>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: sanitizedData.email,
      subject: `Prenotazione • ${escapeHtml(getServiceLabel(sanitizedData.service))} • ${escapeHtml(sanitizedData.date)} ${escapeHtml(sanitizedData.time)} • ${escapeHtml(sanitizedData.name)}`,
      html,
    });

    // Log richiesta riuscita con metriche
    const duration = Date.now() - startTime;
    logger.apiRequest('POST', '/api/booking', 200, duration, {
      ...logContext,
      customerEmail: sanitizedData.email, // Email sanitizzata, non PII critica
      serviceType: sanitizedData.service,
      vehicleType: sanitizedData.vehicle,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const duration = Date.now() - startTime;
    
    // Log errore con context strutturato
    logger.error('Booking API error', {
      ...logContext,
      duration,
    }, error);
    
    // Log metriche API
    logger.apiRequest('POST', '/api/booking', 500, duration, logContext);
    
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


