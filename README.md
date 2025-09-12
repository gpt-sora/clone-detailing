## Ukiyo Crew — Car Detailing

> Nota: La documentazione ufficiale è ora unificata in `GUIDA-PROGETTO.md`. Questo README resta sintetico e rimanda alla guida.

Landing page moderna per servizi di car detailing con form di prenotazione e invio email via Resend. Basata su Next.js (App Router) e TailwindCSS.

### Documentazione
- Leggi la guida completa: `GUIDA-PROGETTO.md`

### Stack
- Next.js 15 (App Router), React 19, TypeScript
- TailwindCSS 4
- Radix UI + shadcn/ui (`src/components/ui`)
- GSAP (animazioni), Embla (carousel)
- Zod + React Hook Form (validazione form)
- Resend (invio email)

## Requisiti
- Node.js ≥ 18.18
- NPM (o Yarn/PNPM/Bun)
- Chiave Resend per invio email

## Avvio rapido
```bash
npm install
npm run dev
# apri http://localhost:3000
```

### Build e produzione
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## Variabili d’ambiente
Crea `.env.local` nella root:
```bash
RESEND_API_KEY=la_tua_chiave_resend
BOOKING_TO_EMAIL=destinatario@tuodominio.com
NEXT_PUBLIC_SITE_URL=https://tuodominio.tld
```

## Struttura (essenziale)
- `src/app/` — App Router, pagine e API
  - `page.tsx` — composizione sezioni landing
  - `api/booking/route.ts` — endpoint POST per invio email
  - `robots.txt/route.ts`, `sitemap.xml/route.ts`
- `src/components/`
  - `BookingForm.tsx` — form con RHF + Zod + toast
  - `ui/` — componenti shadcn/radix (button, input, dialog, ecc.)
- `src/lib/`
  - `schema.ts` — `bookingSchema`
  - `seo.ts` — metadata default

## Funzionalità
- Sezioni: Hero, Services, Gallery, Testimonials, Vision/Mission, Partners
- Form prenotazione: validazione client, invio a `/api/booking`
- Toast di successo/errore
- SEO: metadata, JSON-LD, `robots.txt`, `sitemap.xml`
- A11y: skip link, label/aria corretti

## Endpoint API
Vedi `GUIDA-PROGETTO.md` per dettagli completi su `/api/booking`.

## Script (`package.json`)
```json
{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "eslint"
}
```

## Deploy su Vercel
- Imposta le ENV (`RESEND_API_KEY`, `BOOKING_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`) nelle Project Settings.
- Collega la repo, build automatico su push.