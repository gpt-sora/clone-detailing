"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export type ServiceItem = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  icon: string;
  iconAlt: string;
  photo: string;
  photoAlt: string;
  description?: string;
  procedure?: string[];
  products?: string[];
  tools?: string[];
  recommended?: boolean;
};

// Componente immagine con shimmer skeleton
const ImageWithSkeleton: React.FC<{
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}> = ({ src, alt, sizes, className }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-md border border-black/10 ${className ?? ""}`}>
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-[opacity,transform] duration-300 ease-out ${loaded ? "opacity-100" : "opacity-0"} group-hover:scale-105 group-focus-within:scale-105`}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 group-focus-within:bg-black/10"
      />
    </div>
  );
};

// Testo collassabile con toggle
// (Dettagli rimossi su richiesta)

// Servizi reali (4) — asset presenti in public/images/services/{icons,photos}
const serviceItems: ServiceItem[] = [
  {
    id: 1,
    slug: "detailing-interno",
    title: "Detailing interno",
    summary: "Pulizia, igienizzazione e protezione approfondita di abitacolo e superfici.",
    icon: "/images/services/icons/Detailing-Interno.svg",
    iconAlt: "Icona Detailing interno",
    photo: "/images/services/photos/Detailing-Interno.jpg",
    photoAlt: "Detailing degli interni",
    description:
      "Intervento completo per rimuovere sporco, macchie e odori, ripristinando materiali e comfort. Trattamento specifico per plastiche, tessuti e pelle con protettivi anti‑UV e antistatici.",
    procedure: [
      "Aspirazione e rimozione residui da tappetini, moquette e sedili",
      "Pulizia cruscotto, tunnel e pannelli con detergenti neutri",
      "Dettaglio griglie/pulsanti con pennelli a setole morbide",
      "Lavaggio tessuti ed estrazione; cura della pelle con prodotti pH bilanciato",
      "Pulizia vetri anti‑aloni",
      "Igienizzazione profonda a vapore; opzionale ozono contro odori persistenti",
    ],
    products: [
      "Detergenti pH neutro per plastiche/tessuti",
      "Pulitori e balsami pelle",
      "Igienizzanti certificati",
      "Protettivi anti‑UV e antistatici",
      "Neutralizzanti odori",
    ],
    tools: [
      "Aspiratore professionale con accessori",
      "Estrattore a iniezione/estrazione",
      "Generatore di vapore",
      "Generatore di ozono/nebulizzatore",
      "Pennelli, spazzole e panni in microfibra",
    ],
  },
  {
    id: 2,
    slug: "lucidatura-carrozzeria",
    title: "Lucidatura carrozzeria",
    summary: "Correzione difetti superficiali e ripristino della brillantezza.",
    icon: "/images/services/icons/Lucidatura-Carrozzeria.svg",
    iconAlt: "Icona Lucidatura carrozzeria",
    photo: "/images/services/photos/Lucidatura-Carrozzeria.jpg",
    photoAlt: "Lucidatura della carrozzeria",
    description:
      "Trattamento di correzione e finitura per eliminare swirl, opacità e micrograffi. Conclusione con protezione per preservare gloss e profondità del colore.",
    procedure: [
      "Lavaggio accurato e decontaminazione chimica",
      "Clay bar per superficie liscia",
      "Asciugatura e ispezione con lampade",
      "Mascheratura guarnizioni e plastiche",
      "Correzione con lucidatrici e polish calibrati",
      "Finitura per uniformare e aumentare gloss",
      "Protezione con sigillante/cera/coating",
    ],
    products: [
      "Polish abrasivi e di finitura",
      "Compound correttivi",
      "Sigillanti/cere o coating ceramici",
      "Decontaminanti ferrosi/catramosi/resinosi",
      "Clay bar e lubrificante",
    ],
    tools: [
      "Lucidatrici rotorbitali/rotative",
      "Tamponi spugna/lana/microfibra",
      "Lampade ispezione a spettro solare",
      "Panni microfibra ad alta densità",
      "Nastro mascheratura per detailing",
    ],
    recommended: true,
  },
  {
    id: 3,
    slug: "paint-correction",
    title: "Paint correction",
    summary: "Correzione multi‑step per eliminare difetti e riflessi specchiati.",
    icon: "/images/services/icons/Paint-Correction.svg",
    iconAlt: "Icona Paint correction",
    photo: "/images/services/photos/Paint-Correction.jpeg",
    photoAlt: "Correzione della vernice",
    description:
      "Processo professionale in più passaggi (cutting, polishing, finishing) per rimuovere fino al 90–95% dei difetti visibili e ottenere massima uniformità e brillantezza.",
    procedure: [
      "Ispezione e mappatura difetti",
      "Taglio con compound e tamponi duri",
      "Polishing intermedio per uniformare",
      "Finitura con polish ultra‑fini",
      "Controllo alogene/LED e panel wipe",
      "Protezione lunga durata (sigillante/coating)",
    ],
    products: [
      "Compound da taglio",
      "Polish medi e di finitura",
      "Panel wipe/IPA",
      "Sigillanti o coating ceramici",
      "Lubrificanti e panni microfibra",
    ],
    tools: [
      "Lucidatrici pro (RO/rotativa)",
      "Tamponi duri/medi/morbidi",
      "Lampade ispezione",
      "Panni microfibra e spazzole tampone",
      "Nastro mascheratura",
    ],
  },
  {
    id: 4,
    slug: "sanificazione-ozono",
    title: "Sanificazione interni (ozono)",
    summary: "Trattamento ossidante che elimina batteri, muffe e odori.",
    icon: "/images/services/icons/Sanificazione-Interni-Ozono.svg",
    iconAlt: "Icona Sanificazione interni con ozono",
    photo: "/images/services/photos/Sanificazione-Interni-Ozono.jpg",
    photoAlt: "Sanificazione abitacolo con ozono",
    description:
      "Ciclo professionale 40–60 minuti che diffonde ozono nell’abitacolo e nei condotti A/C, neutralizzando cariche organiche e odori. Eco‑friendly: l’ozono si riconverte in ossigeno.",
    procedure: [
      "Pulizia/igienizzazione preliminare superfici",
      "Posizionamento generatore e tenuta abitacolo",
      "Ciclo di diffusione 40–60 minuti",
      "Trattamento condotti climatizzatore",
      "Areazione e controllo odori residui",
    ],
    products: [
      "Igienizzanti per pre‑clean",
      "Neutralizzanti odori",
      "Pulitori condotti A/C (opzionale)",
      "Filtri abitacolo nuovi (opzionale)",
    ],
    tools: [
      "Generatore di ozono professionale",
      "Attivazione clima/ventilazione",
      "Timer e misurazione ciclo",
      "Panni microfibra e DPI",
    ],
  },
];

// Card incapsulata con accordion indipendente
const ServiceCard: React.FC<{ item: ServiceItem; isSSR?: boolean }> = ({ item, isSSR = false }) => {
  // Usa sizes compatibili con quello che il server si aspetta
  const imageSizes = isSSR ? "(min-width: 1024px) 380px, 100vw" : "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw";

  return (
    <motion.div
      initial={isSSR ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={isSSR ? {} : { y: -5 }}
    >
      <Card className="backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl group h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <Image src={item.icon} alt={item.iconAlt} width={28} height={28} className="dark:invert dark:brightness-90 dark:opacity-90" />
          <span className="capitalize">{item.title}</span>
          {item.recommended ? (
            <span
              aria-label="Consigliato"
              className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
            >
              Consigliato
            </span>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="group">
          <ImageWithSkeleton src={item.photo} alt={item.photoAlt} sizes={imageSizes} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed group-hover:text-white/90 transition-colors">{item.summary}</p>
      </CardContent>
    </Card>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR fallback: usa layout identica alla versione client per evitare mismatch
    return (
      <Section id="services" ariaLabel="Ukiyo Crew — servizi">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">I nostri servizi</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Interni, esterni, motore; protezione vernice, rimozione macchie e oscuramento vetri.
            </p>
          </div>
          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((item) => (
              <ServiceCard key={item.id} item={item} isSSR={true} />
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="services" ariaLabel="Ukiyo Crew — servizi">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">I nostri servizi</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Interni, esterni, motore; protezione vernice, rimozione macchie e oscuramento vetri.
          </p>
        </div>
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
};


