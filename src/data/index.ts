/**
 * Data layer - Export centralizzato per tutti i dati dell'applicazione
 * Segue il pattern di separazione dati/logica per migliore manutenibilità
 */

// Services
export { 
  SERVICES_DATA, 
  getServiceById, 
  getServiceBySlug, 
  getRecommendedServices,
  type ServiceItem 
} from './services';

// Testimonials
export { 
  TESTIMONIALS_DATA, 
  getTestimonialsByRating, 
  getAverageRating, 
  getFeaturedTestimonials,
  type Testimonial 
} from './testimonials';

// Gallery
export { 
  GALLERY_DATA, 
  getGalleryItemsByCategory, 
  getGalleryItemById, 
  getFeaturedGalleryItems,
  type GalleryItem 
} from './gallery';

// Partners
export { 
  PARTNERS_DATA, 
  getPartnersByCategory, 
  getPartnerById, 
  getFeaturedPartners,
  type Partner 
} from './partners';

/**
 * Application constants
 */
export const APP_CONFIG = {
  business: {
    name: "Ukiyo Crew",
    tagline: "Car Detailing Professionale",
    hours: "Lun - Dom: 08:00 - 22:00",
    phone: "+18002345764",
    email: "info@ukiyocrew.com",
  },
  seo: {
    title: "Ukiyo Crew - Car Detailing Professionale",
    description: "Servizi di car detailing professionale: interni, esterni, motore, protezione vernice, rimozione macchie e oscuramento vetri.",
    keywords: ["car detailing", "lucidatura auto", "sanificazione interni", "protezione vernice"],
  },
  social: {
    instagram: "@ukiyocrew",
    facebook: "UkiyoCrew",
    tiktok: "@ukiyocrew",
  },
} as const;
