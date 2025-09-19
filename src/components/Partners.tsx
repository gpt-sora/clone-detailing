import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Image from "next/image";

const logos = [1, 2, 3, 4].map((i) => ({ 
  id: i, 
  src: `/images/partner/partner-${i}.svg`, 
  alt: `Logo partner ${i}` 
}));

export const Partners: React.FC = () => {
  return (
    <Section ariaLabel="Partner">
      <Container>
        <div className="relative overflow-hidden">
          {/* Gradients per fade effect */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
          
          {/* Container dello scroll infinito - pausa automatica su hover con CSS */}
          <div className="flex gap-8 py-4 animate-scroll hover:pause-animation">
            {/* Prima serie di loghi */}
            {logos.map((logo) => (
              <div
                key={`first-${logo.id}`}
                className="flex h-16 w-40 flex-shrink-0 items-center justify-center rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={32}
                  className="opacity-60 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            
            {/* Seconda serie per continuità */}
            {logos.map((logo) => (
              <div
                key={`second-${logo.id}`}
                className="flex h-16 w-40 flex-shrink-0 items-center justify-center rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={32}
                  className="opacity-60 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            
            {/* Terza serie per scroll fluido */}
            {logos.map((logo) => (
              <div
                key={`third-${logo.id}`}
                className="flex h-16 w-40 flex-shrink-0 items-center justify-center rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={32}
                  className="opacity-60 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};


