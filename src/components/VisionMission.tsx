import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const VisionMission: React.FC = () => {
  return (
    <Section id="about" ariaLabel="Vision e Missione">
      <Container className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-black/10 p-6">
          <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">la nostra visione</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Quisque fermentum erat enim. Cras nec nisi at ipsum elementum tincidunt nec nisi. Vivamus pharetra orci non elit egestas, vitae iaculis risus eleifend.
          </p>
          <Button asChild className="mt-4">
            <Link href="#quote">richiedi un preventivo</Link>
          </Button>
        </div>
        <div className="rounded-lg border border-black/10 p-6">
          <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">la nostra missione</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Morbi dui odio, efficitur id enim et, cursus ultricies tortor. Vivamus quis mi lorem. Nunc lorem ipsum dolor sit amet nulla condimentum.
          </p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href="#contact">contattaci</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};


