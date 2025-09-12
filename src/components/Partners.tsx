"use client";
import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const logos = [1, 2, 3, 4].map((i) => ({ id: i, src: `/images/partner-${i}.svg`, alt: `Logo partner ${i}` }));

export const Partners: React.FC = () => {
  const [isAutoplaying, setIsAutoplaying] = React.useState(true);
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const apiRef = React.useRef<import("@/components/ui/carousel").CarouselApi | null>(null);

  React.useEffect(() => {
    if (!isAutoplaying) return;
    autoplayRef.current = setInterval(() => {
      apiRef.current?.scrollNext();
    }, 2500);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplaying]);

  return (
    <Section ariaLabel="Partner">
      <Container>
        <Carousel
          opts={{ loop: true, align: "start" }}
          setApi={(api) => (apiRef.current = api)}
          className="mt-2"
        >
          <CarouselContent className="-ml-0 flex gap-8 py-2">
            {[...logos, ...logos].map((l, idx) => (
              <CarouselItem
                key={`${l.id}-${idx}`}
                className="basis-1/2 sm:basis-1/4 xl:basis-1/6 pl-0"
              >
                <div
                  className="flex h-12 items-center justify-center rounded-md border border-white/5 bg-white/5"
                  onMouseEnter={() => setIsAutoplaying(false)}
                  onMouseLeave={() => setIsAutoplaying(true)}
                >
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={160}
                    height={36}
                    className="opacity-70 invert-0 grayscale"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </Section>
  );
};


