import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Testimonial = {
  name: string;
  quote: string;
  rating: number; // 0..5 with halves
};

const testimonials: Testimonial[] = [
  {
    name: "Leonard Mullingam",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus, mi quis viverra lorem impsum dolor nulla est ornare.",
    rating: 4.5,
  },
  {
    name: "Alexandra Bryce",
    quote:
      "Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra lorem impsum dolor nulla est ornare.",
    rating: 5,
  },
  {
    name: "Jonathan Preston",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus, mi quis viverra lorem impsum dolor nulla est ornare.",
    rating: 4,
  },
];

const Star: React.FC<{ filled?: boolean; half?: boolean }> = ({ filled, half }) => {
  if (half) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id="half" x1="0" x2="1">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="url(#half)"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
};

const RatingStars: React.FC<{ value: number }> = ({ value }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="inline-flex items-center gap-1 text-amber-400" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} filled />
      ))}
      {half === 1 ? <Star half /> : null}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} />
      ))}
    </div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <Section id="testimonials" ariaLabel="Testimonianze clienti">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">testimonianze</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="h-full border-neutral-200 dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{t.name}</CardTitle>
                <RatingStars value={t.rating} />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};


