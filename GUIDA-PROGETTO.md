## Guida Unificata — Ukiyo Crew (Car Detailing)

Questa guida consolida le istruzioni di progetto, la roadmap tecnica, le note performance e le pratiche di sicurezza. Rimpiazza i documenti `README.md`, `FixPlan.md`, `PLAN.md` e `fixperformance.md` come singola fonte di verità.

### Obiettivo
- **Landing moderna** per servizi di car detailing con form prenotazione e invio email.
- **Qualità**: A11y/SEO solide, performance stabili, codice leggibile/manutenibile.

### Stack
- **Next.js 15** (App Router), **React 19**, **TypeScript**
- **TailwindCSS 4**
- Radix UI + shadcn/ui (componenti UI), GSAP (animazioni), Embla (carousel)
- Zod + React Hook Form (validazione), Resend (email)

### Requisiti
- Node.js ≥ 18.18, NPM (o Yarn/PNPM/Bun)

### Avvio rapido
```bash
npm install
npm run dev
# apri http://localhost:3000
```

### Build/Prod
```bash
npm run build
npm start
```

### Variabili d’ambiente
Crea `.env.local` nella root:
```bash
RESEND_API_KEY=...              # obbligatoria per invio email
BOOKING_TO_EMAIL=owner@example.com
NEXT_PUBLIC_SITE_URL=https://tuodominio.tld
```

### Struttura di progetto (essenziale)
- `src/app/` — App Router, pagine e API
  - `page.tsx` — composizione sezioni landing
  - `api/booking/route.ts` — endpoint POST per invio email
  - `robots.txt/route.ts`, `sitemap.xml/route.ts`
- `src/components/`
  - Sezioni: `Hero`, `Services`, `Gallery`, `Pricing` (se presente), `Testimonials`, `VisionMission`, `Partners`, `Footer`, `Header`
  - `BookingForm.tsx` — form con RHF + Zod + toast
  - `ui/` — componenti shadcn/radix (button, input, dialog, ecc.)
- `src/lib/`
  - `schema.ts` — `bookingSchema`
  - `seo.ts` — metadata default
  - `animations.ts`, `utils.ts`
- `public/` — immagini, video

### Funzionalità principali
- Sezioni landing complete; animazioni GSAP; carousel Embla
- Form prenotazione con validazione client e invio email via `/api/booking`
- SEO: metadata, JSON-LD, `robots.txt`, `sitemap.xml`
- A11y: focus stati, aria-label, dialog/accordion/tabs accessibili

### API — POST `/api/booking`
- Valida input con Zod e invia email via Resend.
- Body atteso:
```json
{
  "name": "Mario Rossi",
  "email": "mario@email.com",
  "phone": "+39 123456789",
  "date": "2025-09-10",
  "time": "10:30",
  "vehicle": "car | suv | truck | bike",
  "service": "interior-detailing | exterior-detailing | engine-detailing | stains-removal | paint-protection | windows-tinting",
  "notes": "Richieste opzionali",
  "website": ""
}
```
- Regole: `website` è honeypot → deve restare vuoto; errori form tornano 400.
- Risposte: 200 `{ ok: true }`, 204 su honeypot, 400 validazione, 403 origin non consentita, 500 servizio email non configurato.

---

## Roadmap operativa (priorità)

### A. Fix bloccanti
1) Correggere CSS variables: sostituisci `::root` → `:root` in `src/app/globals.css`.
2) Hardening `/api/booking`:
   - Escaping HTML di tutti i campi utente.
   - Rate limit in‑memory per IP (es. 5 richieste/10 min/IP).
   - Verifica `Origin/Referer` contro `NEXT_PUBLIC_SITE_URL`.
   - Honeypot: se valorizzato → `204 No Content`.
   - Guard dimensione body (es. >50KB → 413/400). Log sintetici senza PII.

### B. A11y/UX
3) Hero (team grid): rimuovere `tabIndex` se non interattivo o convertirlo in azione reale.
4) Hero (play): rimuovere `onKeyDown` superfluo (button gestisce già Space/Enter).
5) Gallery (dialog): `alt` dinamico, aggiungi bottone "Chiudi" visibile.
6) Header: aggiungi `aria-controls` per menu mobile.

### C. Copy/Branding
7) `Services`: heading/`ariaLabel` allineati a "Ukiyo Crew"/"Servizi".
8) Uniformare microcopy/aria in italiano.

### D. SEO/Metadati
9) Centralizzare `SITE_URL` in ENV e usarlo in `seo.ts`, `robots`, `sitemap`, JSON‑LD.
10) Aggiornare JSON‑LD con dati reali: `LocalBusiness/AutoDetailing`, `name`, `url`, `image`, `telephone`, `address`, `openingHours`.

### E. Performance (quick wins)
11) `Hero` video: usare `poster="/images/hero-poster.webp"`.
12) `next.config.ts`: headers di sicurezza/performance (vedi sotto) e cache per asset.

### F. Pulizia/Config
13) `tsconfig.json`: `allowJs: false` se non servono .js.
14) Verificare/rimuovere dipendenze non usate (`next-themes`, `lucide-react`, ecc.).

---

## Sicurezza — dettagli

### Escaping HTML (server)
```ts
const escapeHtml = (input: string): string =>
  input
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#39;");
```

### Rate limiting (in‑memory semplice)
```ts
type HitStore = Map<string, number[]>; // ip -> timestamps (ms)
const hits: HitStore = new Map();

const isRateLimited = (ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean => {
  const now = Date.now();
  const arr = hits.get(ip) ?? [];
  const recent = arr.filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
};
```

### Origin/Referer check
```ts
const allowed = process.env.NEXT_PUBLIC_SITE_URL;
const origin = req.headers.get("origin") ?? undefined;
const referer = req.headers.get("referer") ?? undefined;
const isAllowed = allowed && (origin?.startsWith(allowed) || referer?.startsWith(allowed));
if (!isAllowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
```

### Security/Perf headers (`next.config.ts`)
```ts
export default {
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(images|videos)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        ],
      },
    ];
  },
};
```

---

## Performance — guida pratica
- Dinamizzare sezioni below‑the‑fold (`Gallery`, `Testimonials`, `Partners`).
- Lazy‑load per Embla/lightbox/GSAP dove non critico sul first paint.
- Import granulari da shadcn/ui, rimuovere asset e codice non usati.
- Analisi bundle con `@next/bundle-analyzer`:
```ts
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
const nextConfig = { /* ...headers... */ };
export default withBundleAnalyzer(nextConfig);
```
Comando: `ANALYZE=true npm run build`.

### Linee guida test Lighthouse
- Testare su build prod: `npm run build && npm run start`
- Finestra anonima, niente estensioni; Mobile e Desktop; Throttling Simulated

---

## Checklist operativa
- [ ] Fix `:root` in `globals.css`
- [ ] Hardening `/api/booking` (escape, rate limit, origin check, honeypot 204, content-length guard)
- [ ] A11y: Hero team, Hero play keydown, Gallery alt/close, Header aria-controls
- [ ] Copy IT e `Services` heading/aria
- [ ] SEO/Meta: `SITE_URL`, JSON‑LD/robots/sitemap aggiornati
- [ ] Performance: poster video statico, split/lazy GSAP/Embla/lightbox, import shadcn granulari
- [ ] Pulizia: `allowJs: false`, rimozione deps/asset non usati
- [ ] Build prod e nuovi report Lighthouse (salvare in `lighhouseresults/`)

---

## Deploy (Vercel)
- Imposta `RESEND_API_KEY` e `BOOKING_TO_EMAIL` nelle Project Settings.
- Configura `NEXT_PUBLIC_SITE_URL` per SEO/robots/sitemap/JSON‑LD.
- App Router + Turbopack; build su push.

## Criteri di accettazione
- Lighthouse: Mobile ≥ 75 Performance; Desktop ≥ 90; A11y/Best/SEO ≥ 90.
- Nessun errore console; validazioni client/server OK; UX/A11y conformi.

## Note
- Questa guida sostituisce gli altri documenti. Mantenere aggiornato SOLO questo file.
