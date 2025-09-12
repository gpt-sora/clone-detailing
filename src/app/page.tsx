import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import dynamic from "next/dynamic";
const Gallery = dynamic(() => import("@/components/Gallery").then(m => m.Gallery));
const Testimonials = dynamic(() => import("@/components/Testimonials").then(m => m.Testimonials));
const VisionMission = dynamic(() => import("@/components/VisionMission").then(m => m.VisionMission));
const Partners = dynamic(() => import("@/components/Partners").then(m => m.Partners));
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/BookingForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <VisionMission />
      <Partners />
      <Section id="contact" ariaLabel="Contatti e prenotazioni">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">contattaci</h2>
          <div className="mt-6 max-w-2xl">
            <BookingForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
