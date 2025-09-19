import dynamic from "next/dynamic";
import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";
import { ServicesSkeleton } from "@/components/skeletons/ServicesSkeleton";

// Lazy load componenti pesanti con skeleton loaders
const Hero = dynamic(() => import("@/components/Hero").then(m => m.Hero), {
  loading: () => <HeroSkeleton />,
  ssr: true
});

const Services = dynamic(() => import("@/components/Services").then(m => m.Services), {
  loading: () => <ServicesSkeleton />,
  ssr: true
});

const Gallery = dynamic(() => import("@/components/Gallery").then(m => m.Gallery), {
  loading: () => (
    <div className="min-h-[400px] animate-pulse bg-gradient-to-b from-transparent to-background/50" />
  )
});

// Server components - importati direttamente per migliori performance
import { Testimonials } from "@/components/Testimonials";
import { VisionMission } from "@/components/VisionMission";
import { Partners } from "@/components/Partners";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

// BookingForm rimane dynamic perché usa form hooks
const BookingForm = dynamic(() => import("@/components/BookingForm").then(m => m.BookingForm), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 bg-muted rounded mb-4" />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
        <div className="h-24 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
      </div>
    </div>
  )
});

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
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contattaci</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Prenota ora il tuo servizio di car detailing professionale
            </p>
          </div>
          <div className="mt-10 max-w-2xl mx-auto">
            <BookingForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
