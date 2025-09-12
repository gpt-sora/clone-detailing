import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schema";
import { Resend } from "resend";

// In-memory rate limit store: ip -> timestamps (ms)
const requestTimestampsByIp: Map<string, number[]> = new Map();

const getClientIp = (req: Request): string => {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  const xrip = req.headers.get("x-real-ip");
  if (xrip) return xrip.trim();
  return "unknown";
};

const isRateLimited = (ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean => {
  const now = Date.now();
  const arr = requestTimestampsByIp.get(ip) ?? [];
  const recent = arr.filter((t) => now - t < windowMs);
  recent.push(now);
  requestTimestampsByIp.set(ip, recent);
  return recent.length > limit;
};

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
  "interior-detailing": "Interni",
  "exterior-detailing": "Esterni",
  "engine-detailing": "Vano motore",
  "stains-removal": "Rimozione macchie",
  "paint-protection": "Protezione vernice",
  "windows-tinting": "Oscuramento vetri",
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
  try {
    // Origin/Referer check
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Rate limit
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
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

    const html = `
      <h2>Nuova richiesta prenotazione</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Veicolo:</strong> ${escapeHtml(getVehicleLabel(data.vehicle))}</p>
      <p><strong>Servizio:</strong> ${escapeHtml(getServiceLabel(data.service))}</p>
      <p><strong>Data/Ora:</strong> ${escapeHtml(data.date)} ${escapeHtml(data.time)}</p>
      <p><strong>Note:</strong> ${data.notes ? escapeHtml(data.notes) : "-"}</p>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `Prenotazione • ${escapeHtml(getServiceLabel(data.service))} • ${escapeHtml(data.date)} ${escapeHtml(data.time)} • ${escapeHtml(data.name)}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/booking error");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


