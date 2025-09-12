"use client";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/animations";

const galleryItems = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/gallery-0${i + 1}.svg`,
  alt: `Immagine galleria ${i + 1}`,
}));

export const Gallery: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [activeSrc, setActiveSrc] = React.useState<string | null>(null);
  const [activeAlt, setActiveAlt] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isReducedMotion()) return;
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-gallery-item]")
    );
    if (items.length === 0) return;
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.4 } });
    tl.from(items, { y: 16, opacity: 0, stagger: 0.06 });
    return () => {
      tl.kill();
    };
  }, []);

  const handleOpen = (src: string, alt: string) => {
    setActiveSrc(src);
    setActiveAlt(alt);
    setOpen(true);
  };

  return (
    <Section id="gallery" ariaLabel="Galleria fotografica">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">galleria</h2>

        <div ref={containerRef}>
        <Carousel opts={{ loop: true }} className="mt-6">
          <CarouselContent>
            {galleryItems.map((item) => (
              <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3" data-gallery-item>
                <button
                  className="group relative block overflow-hidden rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30"
                  onClick={() => handleOpen(item.src, item.alt)}
                  aria-label={`Apri immagine ${item.id}`}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(min-width: 1024px) 380px, 100vw" />
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <div className="hidden sm:flex items-center justify-end gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl p-0">
            <button
              className="absolute left-3 top-3 z-10 rounded bg-black/60 px-3 py-1 text-sm text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
            >
              Chiudi
            </button>
            <div className="relative aspect-[16/10] w-full">
              {activeSrc ? (
                <Image src={activeSrc} alt={activeAlt || "Immagine selezionata"} fill className="object-contain bg-black" sizes="(min-width: 1024px) 960px, 100vw" />
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </Section>
  );
};


