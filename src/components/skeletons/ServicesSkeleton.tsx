import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const ServicesSkeleton = () => {
  return (
    <Section id="services" ariaLabel="I nostri servizi">
      <Container>
        <div className="text-center">
          <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-white/10" />
          <div className="mx-auto mt-3 h-6 w-96 animate-pulse rounded-lg bg-white/10" />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-6">
              <div className="h-12 w-12 animate-pulse rounded-lg bg-white/10" />
              <div className="mt-4 h-6 w-3/4 animate-pulse rounded-lg bg-white/10" />
              <div className="mt-2 space-y-2">
                <div className="h-4 w-full animate-pulse rounded-lg bg-white/10" />
                <div className="h-4 w-5/6 animate-pulse rounded-lg bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
