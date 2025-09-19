import { Container } from "@/components/layout/Container";

export const HeroSkeleton = () => {
  return (
    <section className="relative min-h-screen">
      <Container className="relative z-10 flex h-screen flex-col justify-center">
        <div className="max-w-3xl space-y-4">
          <div className="h-12 w-3/4 animate-pulse rounded-lg bg-white/10" />
          <div className="h-8 w-2/3 animate-pulse rounded-lg bg-white/10" />
          <div className="mt-8 flex gap-4">
            <div className="h-11 w-32 animate-pulse rounded-lg bg-white/10" />
            <div className="h-11 w-32 animate-pulse rounded-lg bg-white/10" />
          </div>
        </div>
      </Container>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-background/50 to-background" />
    </section>
  );
};
