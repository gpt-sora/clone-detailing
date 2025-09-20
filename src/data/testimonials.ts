/**
 * Dati delle testimonianze clienti
 * Estratti dal componente Testimonials per migliorare la manutenibilità
 */

export type Testimonial = {
  name: string;
  quote: string;
  rating: number; // 0..5 with halves
  avatar?: string;
  location?: string;
  service?: string;
};

export const TESTIMONIALS_DATA: Testimonial[] = [
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
] as const;

/**
 * Utility functions per le testimonianze
 */
export const getTestimonialsByRating = (minRating: number): Testimonial[] => {
  return TESTIMONIALS_DATA.filter(testimonial => testimonial.rating >= minRating);
};

export const getAverageRating = (): number => {
  const total = TESTIMONIALS_DATA.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return Math.round((total / TESTIMONIALS_DATA.length) * 10) / 10;
};

export const getFeaturedTestimonials = (): Testimonial[] => {
  return TESTIMONIALS_DATA.filter(testimonial => testimonial.rating >= 4.5);
};
