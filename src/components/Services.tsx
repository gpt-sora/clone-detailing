"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { SERVICES_DATA, type ServiceItem } from "@/data";

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

// Dati servizi importati dal data layer

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
            {SERVICES_DATA.map((item) => (
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
          {SERVICES_DATA.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
};


