# 📋 Piano di Fix 2.0 - Analisi Completa e Roadmap

## 🔍 Panoramica Struttura del Progetto

Il progetto è una **landing page moderna per car detailing** basata su:
- **Next.js 15** con App Router
- **React 19** con TypeScript
- **TailwindCSS 4** 
- **Componenti UI**: Radix UI + shadcn/ui
- **Animazioni**: GSAP
- **Form**: React Hook Form + Zod
- **Email**: Resend API

## 🚨 Problemi Critici Identificati

### 1. **Performance Issues**

#### a) **Uso eccessivo di "use client"**
- **14 componenti** marcati come client components
- Molti potrebbero essere server components (es. `Footer`, `Container`, `Section`)
- Impatto: bundle JavaScript più grande, TTI più lento

#### b) **Caricamento non ottimizzato**
- `dynamic` imports solo per alcuni componenti (`Gallery`, `Testimonials`, etc.)
- `Services` e `Hero` caricati immediatamente nonostante siano pesanti
- Mancanza di lazy loading strategico

#### c) **Gestione immagini**
- Gallery usa `.jpg` ma potrebbero essere ottimizzate con WebP/AVIF
- Mancanza di blur placeholder per le immagini
- Nessun lazy loading per immagini below the fold

### 2. **Sicurezza**

#### a) **Console.error esposto**
```typescript
console.error("/api/booking error"); // Linea 127 in route.ts
```
- Espone informazioni in produzione
- Dovrebbe usare un logger configurabile

#### b) **Rate limiting debole**
- Solo in-memory, si resetta al restart del server
- Facilmente aggirabile cambiando IP
- Nessuna protezione CAPTCHA o challenge

#### c) **Validazione input insufficiente**
- Manca sanitizzazione profonda degli input
- XSS potenziale nei campi note/nome se mal gestiti
- Nessun controllo lunghezza massima stringhe lato client

### 3. **Architettura e Codice**

#### a) **Accoppiamento componenti**
- Le card dei servizi non sono veramente indipendenti
- Dati hardcoded nel componente invece che in file separati
- Difficile estendere/modificare senza toccare il componente

#### b) **Gestione stato ridondante**
- `Hero.tsx`: troppe useState per gestire il video (10+ stati)
- Logica complessa che potrebbe essere estratta in custom hook
- Re-render non necessari

#### c) **Type safety debole**
- Molti `any` impliciti
- Mancanza di strict mode in alcuni punti
- Props non sempre ben tipizzate
- Union types non exhaustive

### 4. **Accessibilità (A11y)**

#### a) **Focus management**
- Menu mobile non trappa il focus quando aperto
- Dialog gallery senza bottone chiudi visibile
- Mancano alcuni aria-labels critici

#### b) **Keyboard navigation**
- Team grid in Hero con tabIndex ma non interattivo
- Gallery non completamente navigabile da tastiera
- Form non annuncia errori a screen reader

### 5. **SEO e Metadata**

#### a) **Dati fittizi**
- JSON-LD con dati placeholder (London, UK invece di dati reali)
- Numero telefono generico (+39 000 000 0000)
- Indirizzo non reale (5th Street)

#### b) **Missing assets**
- `/og-image.jpg` referenziato ma non presente
- Potenziali 404 in produzione
- Mancano favicon variants

### 6. **Manutenibilità**

#### a) **Magic numbers/strings**
- Durate animazioni hardcoded (300ms, 600ms)
- Breakpoint non centralizzati
- Colori/spacing non sempre da design system

#### b) **Commenti e documentazione**
- Pochi commenti nel codice
- Mancanza di JSDoc per funzioni complesse
- README minimo senza esempi

## 📝 Piano di Fix Strutturato

### **Fase 1: Fix Critici (Sicurezza e Bug) - URGENTE**

#### Task 1.1: Sicurezza API ⚠️
```typescript
// ❌ PRIMA
console.error("/api/booking error");

// ✅ DOPO
const logger = {
  error: (msg: string, error?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(msg, error);
    }
    // In produzione, inviare a servizio di logging (es. Sentry)
  }
};
```

**File da modificare**: `src/app/api/booking/route.ts`

#### Task 1.2: Sanitizzazione Input 🛡️
```typescript
// Installare
npm install isomorphic-dompurify @types/dompurify

// Implementare
import DOMPurify from 'isomorphic-dompurify';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [] 
  });
};

// Applicare a tutti gli input utente
const cleanName = sanitizeInput(data.name);
const cleanNotes = sanitizeInput(data.notes || '');
```

**Files**: `src/app/api/booking/route.ts`, `src/lib/sanitize.ts` (nuovo)

#### Task 1.3: Fix Honeypot 🍯
```typescript
// ❌ PRIMA
<input type="text" className="hidden" {...register("website")} />

// ✅ DOPO
<input 
  type="text" 
  style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1}
  autoComplete="off"
  {...register("website")} 
/>
```

**File**: `src/components/BookingForm.tsx`

#### Task 1.4: Rate Limiting Robusto 🚦
```typescript
// Implementare con Redis o database
// Per ora, migliorare in-memory con cleanup

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Cleanup ogni ora
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (data.resetTime < now) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 60 * 1000);
```

**File**: `src/app/api/booking/route.ts`

### **Fase 2: Performance - ALTA PRIORITÀ**

#### Task 2.1: Ottimizzare Client Components 🚀
```typescript
// Analizzare e convertire questi componenti in server components:
// - Footer.tsx (nessuna interattività)
// - Container.tsx (solo styling)
// - Section.tsx (solo styling)
// - VisionMission.tsx (contenuto statico)
// - Partners.tsx (contenuto statico)

// Rimuovere "use client" dove non necessario
```

**Files coinvolti**: 5-6 componenti da convertire

#### Task 2.2: Image Optimization 🖼️
```typescript
// 1. Generare placeholder blur
// Script per generare base64 placeholders
import { getPlaiceholder } from 'plaiceholder';

// 2. Implementare nei componenti
<Image 
  src="/images/gallery/gallery-01.jpg"
  placeholder="blur"
  blurDataURL={base64}
  loading="lazy" // per immagini below fold
/>

// 3. Convertire immagini in WebP/AVIF
// Usare sharp o simili per batch conversion
```

**Files**: `Gallery.tsx`, `Services.tsx`, `Hero.tsx`

#### Task 2.3: Bundle Splitting Avanzato 📦
```typescript
// Lazy load componenti pesanti
const Services = dynamic(() => import('./Services'), {
  loading: () => <ServicesSkeleton />,
});

const Hero = dynamic(() => import('./Hero'), {
  loading: () => <HeroSkeleton />,
  ssr: true // mantenere SSR per SEO
});

// Preload critical resources
<link rel="preload" href="/fonts/..." as="font" crossOrigin="" />
```

**File**: `src/app/page.tsx`

### **Fase 3: Architettura - MEDIA PRIORITÀ**

#### Task 3.1: Estrarre Dati in File Separati 📁
```typescript
// Creare src/data/services.ts
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'detailing-interno',
    slug: 'detailing-interno',
    title: 'Detailing interno',
    summary: '...',
    // ...resto dei dati
  }
];

// Creare src/data/testimonials.ts
export const TESTIMONIALS_DATA: Testimonial[] = [
  // ...
];
```

**Nuovi files**: `src/data/services.ts`, `src/data/testimonials.ts`, etc.

#### Task 3.2: Custom Hooks per Logica Complessa 🎣
```typescript
// src/hooks/useVideoPlayer.ts
export const useVideoPlayer = (videoRef: RefObject<HTMLVideoElement>) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  
  const play = useCallback(async () => {
    // logica centralizzata
  }, []);
  
  const pause = useCallback(() => {
    // logica centralizzata
  }, []);
  
  return { ...state, play, pause, toggle };
};
```

**Nuovo file**: `src/hooks/useVideoPlayer.ts`

#### Task 3.3: Componenti Atomici e Composizione 🧩
```typescript
// Estrarre componenti riutilizzabili
// src/components/ui/ServiceCard.tsx
export const ServiceCard = ({ service }: { service: ServiceItem }) => {
  // componente isolato e testabile
};

// src/components/ui/ImageWithSkeleton.tsx
export const ImageWithSkeleton = (props: ImageProps) => {
  // riutilizzabile in tutto il progetto
};
```

### **Fase 4: Accessibilità - ALTA PRIORITÀ**

#### Task 4.1: Focus Trap per Menu Mobile 🎯
```typescript
// Installare
npm install focus-trap-react

// Implementare
import FocusTrap from 'focus-trap-react';

{isOpen && (
  <FocusTrap>
    <div id="mobile-menu">
      {/* contenuto menu */}
    </div>
  </FocusTrap>
)}
```

**File**: `src/components/Header.tsx`

#### Task 4.2: ARIA Improvements 📢
```typescript
// Form errors con aria-live
<div aria-live="polite" aria-atomic="true">
  {errors.email && (
    <p id="email-error" role="alert">
      {errors.email.message}
    </p>
  )}
</div>

// Gallery con navigazione completa
<button
  aria-label={`Vai all'immagine ${index + 1} di ${total}`}
  aria-current={current === index ? 'true' : undefined}
/>
```

#### Task 4.3: Skip Links e Landmarks 🏗️
```typescript
// Aggiungere skip links multipli
<a href="#services" className="skip-link">Vai ai servizi</a>
<a href="#gallery" className="skip-link">Vai alla galleria</a>
<a href="#contact" className="skip-link">Vai ai contatti</a>

// Verificare landmarks
<main role="main">
<nav role="navigation" aria-label="Principale">
<aside role="complementary">
```

### **Fase 5: Testing e QA - MEDIA PRIORITÀ**

#### Task 5.1: Setup Testing Framework 🧪
```bash
# Installare dipendenze
npm i -D vitest @testing-library/react @testing-library/user-event jsdom

# Configurare vitest.config.ts
```

#### Task 5.2: Test Critici 🎯
```typescript
// Test per BookingForm
describe('BookingForm', () => {
  it('should validate required fields', async () => {
    // ...
  });
  
  it('should prevent spam with honeypot', async () => {
    // ...
  });
});

// Test per API route
describe('/api/booking', () => {
  it('should rate limit requests', async () => {
    // ...
  });
});
```

#### Task 5.3: E2E con Playwright 🎭
```typescript
// Test user journey completo
test('user can book appointment', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Prenota');
  // ... compilare form
  await expect(page.locator('.toast')).toContainText('Richiesta inviata');
});
```

### **Fase 6: Documentazione - BASSA PRIORITÀ**

#### Task 6.1: JSDoc per Funzioni Complesse 📝
```typescript
/**
 * Gestisce la validazione e l'invio del form di prenotazione
 * @param {BookingInput} data - Dati del form validati da Zod
 * @returns {Promise<{ok: boolean}>} Risultato dell'invio
 * @throws {Error} Se l'invio fallisce
 */
async function handleBookingSubmission(data: BookingInput): Promise<{ok: boolean}> {
  // ...
}
```

#### Task 6.2: README Dettagliato 📚
- Architettura del progetto
- Setup ambiente locale
- Deploy in produzione
- Troubleshooting comune
- Contributing guidelines

## 🎯 Checklist Priorità Immediate

- [ ] **URGENTE**: Rimuovere console.error in produzione
- [ ] **URGENTE**: Implementare sanitizzazione input
- [ ] **ALTO**: Convertire Footer, Container, Section in server components
- [ ] **ALTO**: Aggiungere focus trap al menu mobile
- [ ] **ALTO**: Fix aria-labels mancanti
- [ ] **MEDIO**: Estrarre dati in file separati
- [ ] **MEDIO**: Implementare blur placeholders per immagini
- [ ] **MEDIO**: Setup test framework base

## 📊 Metriche di Successo

### Performance
- **LCP**: < 2.5s (da misurare)
- **FID**: < 100ms (da misurare)
- **CLS**: < 0.1 (da misurare)
- **Bundle Size**: Riduzione del 30% del JS iniziale

### Qualità
- **Lighthouse Accessibility**: 100/100
- **TypeScript Coverage**: 100% (no any)
- **Test Coverage**: >80% per logica critica
- **Zero errori in console** in produzione

### Sicurezza
- **Rate limiting** efficace
- **Input sanitization** su tutti i campi
- **No data leaks** in produzione

## 🗓️ Timeline Suggerita

**Settimana 1**: Fase 1 (Fix Critici) + inizio Fase 2
**Settimana 2**: Completare Fase 2 + Fase 4 (A11y)
**Settimana 3**: Fase 3 (Architettura) + inizio Fase 5
**Settimana 4**: Completare Fase 5 + Fase 6

## 📌 Note Finali

1. Eseguire sempre `npm run lint` prima di committare
2. Testare su dispositivi reali, non solo browser
3. Monitorare metriche con Lighthouse CI
4. Considerare l'uso di Sentry per error tracking in produzione
5. Documentare ogni decisione architetturale importante

---

**Ultimo aggiornamento**: ${new Date().toLocaleDateString('it-IT')}
**Versione**: 2.0
