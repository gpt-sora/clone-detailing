/**
 * Dati della galleria fotografica
 * Estratti dal componente Gallery per migliorare la manutenibilità
 */

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: 'interior' | 'exterior' | 'engine' | 'before-after';
};

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery/gallery-01.jpg",
    alt: "Detailing auto 1 - Lavoro professionale",
    title: "Detailing Interni Premium",
    description: "Pulizia approfondita e sanificazione abitacolo",
    category: "interior"
  },
  {
    id: 2,
    src: "/images/gallery/gallery-02.jpg",
    alt: "Detailing auto 2 - Lavoro professionale",
    title: "Lucidatura Carrozzeria",
    description: "Correzione difetti e ripristino brillantezza",
    category: "exterior"
  },
  {
    id: 3,
    src: "/images/gallery/gallery-03.jpg",
    alt: "Detailing auto 3 - Lavoro professionale",
    title: "Paint Correction",
    description: "Eliminazione swirl e micro-graffi",
    category: "exterior"
  },
  {
    id: 4,
    src: "/images/gallery/gallery-04.jpg",
    alt: "Detailing auto 4 - Lavoro professionale",
    title: "Detailing Vano Motore",
    description: "Pulizia e protezione componenti motore",
    category: "engine"
  },
  {
    id: 5,
    src: "/images/gallery/gallery-05.jpg",
    alt: "Detailing auto 5 - Lavoro professionale",
    title: "Sanificazione Ozono",
    description: "Trattamento antibatterico e deodorizzante",
    category: "interior"
  },
  {
    id: 6,
    src: "/images/gallery/gallery-06.jpg",
    alt: "Detailing auto 6 - Lavoro professionale",
    title: "Protezione Vernice",
    description: "Applicazione coating ceramico",
    category: "exterior"
  },
  {
    id: 7,
    src: "/images/gallery/gallery-07.jpg",
    alt: "Detailing auto 7 - Lavoro professionale",
    title: "Prima e Dopo",
    description: "Trasformazione completa veicolo",
    category: "before-after"
  },
  {
    id: 8,
    src: "/images/gallery/gallery-08.jpg",
    alt: "Detailing auto 8 - Lavoro professionale",
    title: "Risultato Finale",
    description: "Detailing completo premium",
    category: "before-after"
  },
] as const;

/**
 * Utility functions per la galleria
 */
export const getGalleryItemsByCategory = (category: GalleryItem['category']): GalleryItem[] => {
  return GALLERY_DATA.filter(item => item.category === category);
};

export const getGalleryItemById = (id: number): GalleryItem | undefined => {
  return GALLERY_DATA.find(item => item.id === id);
};

export const getFeaturedGalleryItems = (count: number = 6): GalleryItem[] => {
  return GALLERY_DATA.slice(0, count);
};
