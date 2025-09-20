/**
 * Dati dei partner commerciali
 * Estratti dal componente Partners per migliorare la manutenibilità
 */

export type Partner = {
  id: number;
  name: string;
  logo: string;
  alt: string;
  website?: string;
  description?: string;
  category?: 'product' | 'service' | 'technology' | 'sponsor';
};

export const PARTNERS_DATA: Partner[] = [
  {
    id: 1,
    name: "Partner Premium 1",
    logo: "/images/partner/partner-1.svg",
    alt: "Logo partner 1",
    description: "Partner prodotti professionali",
    category: "product"
  },
  {
    id: 2,
    name: "Partner Premium 2", 
    logo: "/images/partner/partner-2.svg",
    alt: "Logo partner 2",
    description: "Partner tecnologie avanzate",
    category: "technology"
  },
  {
    id: 3,
    name: "Partner Premium 3",
    logo: "/images/partner/partner-3.svg", 
    alt: "Logo partner 3",
    description: "Partner servizi specializzati",
    category: "service"
  },
  {
    id: 4,
    name: "Partner Premium 4",
    logo: "/images/partner/partner-4.svg",
    alt: "Logo partner 4", 
    description: "Partner sponsor ufficiale",
    category: "sponsor"
  },
] as const;

/**
 * Utility functions per i partner
 */
export const getPartnersByCategory = (category: Partner['category']): Partner[] => {
  return PARTNERS_DATA.filter(partner => partner.category === category);
};

export const getPartnerById = (id: number): Partner | undefined => {
  return PARTNERS_DATA.find(partner => partner.id === id);
};

export const getFeaturedPartners = (): Partner[] => {
  return PARTNERS_DATA.filter(partner => partner.category === 'product' || partner.category === 'technology');
};
