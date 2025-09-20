"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import { GALLERY_DATA } from "@/data";

export const Gallery: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  // Configurazione Embla con autoplay
  const autoplayOptions = React.useMemo(
    () => ({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      skipSnaps: false,
      dragFree: false,
    }, 
    [Autoplay(autoplayOptions)]
  );

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    align: 'start',
  });

  const handlePrevious = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleThumbClick = React.useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, emblaThumbsApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Section id="gallery" ariaLabel="Galleria fotografica">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              I Nostri Lavori
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Scopri la qualità del nostro lavoro attraverso i risultati ottenuti
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-lg border border-white/10 bg-white/5" />
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="gallery" ariaLabel="Galleria fotografica">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            I Nostri Lavori
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Scopri la qualità del nostro lavoro attraverso i risultati ottenuti
          </p>
        </div>

        {/* Carousel principale */}
        <div className="relative mt-10">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {GALLERY_DATA.map((item, index) => (
                <div 
                  key={item.id} 
                  className="relative min-w-0 flex-[0_0_100%]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 960px, 100vw"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controlli navigazione */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-200 shadow-lg"
            aria-label="Immagine precedente"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-200 shadow-lg"
            aria-label="Immagine successiva"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>
        </div>

        {/* Thumbnails */}
        <div className="mt-6">
          <div className="overflow-hidden" ref={emblaThumbsRef}>
            <div className="flex gap-2">
              {GALLERY_DATA.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleThumbClick(index)}
                  whileHover={mounted ? { scale: 1.05 } : {}}
                  whileTap={mounted ? { scale: 0.95 } : {}}
                  className={cn(
                    "relative min-w-0 flex-[0_0_120px] cursor-pointer overflow-hidden rounded-md border-2 transition-all",
                    selectedIndex === index 
                      ? "border-primary opacity-100 shadow-lg shadow-primary/25" 
                      : "border-white/20 opacity-60 hover:opacity-80 hover:border-white/40"
                  )}
                  aria-label={`Vai all'immagine ${index + 1}`}
                  aria-current={selectedIndex === index ? "true" : undefined}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                      loading="lazy"
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Indicatore pagina */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {selectedIndex + 1} / {GALLERY_DATA.length}
        </div>
      </Container>
    </Section>
  );
};


