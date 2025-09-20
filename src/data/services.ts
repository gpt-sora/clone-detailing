/**
 * Dati dei servizi di car detailing
 * Estratti dal componente Services per migliorare la manutenibilità
 */

export type ServiceItem = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  icon: string;
  iconAlt: string;
  photo: string;
  photoAlt: string;
  description?: string;
  procedure?: string[];
  products?: string[];
  tools?: string[];
  recommended?: boolean;
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    slug: "detailing-interno",
    title: "Detailing interno",
    summary: "Pulizia, igienizzazione e protezione approfondita di abitacolo e superfici.",
    icon: "/images/services/icons/Detailing-Interno.svg",
    iconAlt: "Icona Detailing interno",
    photo: "/images/services/photos/Detailing-Interno.jpg",
    photoAlt: "Detailing degli interni",
    description:
      "Intervento completo per rimuovere sporco, macchie e odori, ripristinando materiali e comfort. Trattamento specifico per plastiche, tessuti e pelle con protettivi anti‑UV e antistatici.",
    procedure: [
      "Aspirazione e rimozione residui da tappetini, moquette e sedili",
      "Pulizia cruscotto, tunnel e pannelli con detergenti neutri",
      "Dettaglio griglie/pulsanti con pennelli a setole morbide",
      "Lavaggio tessuti ed estrazione; cura della pelle con prodotti pH bilanciato",
      "Pulizia vetri anti‑aloni",
      "Igienizzazione profonda a vapore; opzionale ozono contro odori persistenti",
    ],
    products: [
      "Detergenti pH neutro per plastiche/tessuti",
      "Pulitori e balsami pelle",
      "Igienizzanti certificati",
      "Protettivi anti‑UV e antistatici",
      "Neutralizzanti odori",
    ],
    tools: [
      "Aspiratore professionale con accessori",
      "Estrattore a iniezione/estrazione",
      "Generatore di vapore",
      "Generatore di ozono/nebulizzatore",
      "Pennelli, spazzole e panni in microfibra",
    ],
  },
  {
    id: 2,
    slug: "lucidatura-carrozzeria",
    title: "Lucidatura carrozzeria",
    summary: "Correzione difetti superficiali e ripristino della brillantezza.",
    icon: "/images/services/icons/Lucidatura-Carrozzeria.svg",
    iconAlt: "Icona Lucidatura carrozzeria",
    photo: "/images/services/photos/Lucidatura-Carrozzeria.jpg",
    photoAlt: "Lucidatura della carrozzeria",
    description:
      "Trattamento di correzione e finitura per eliminare swirl, opacità e micrograffi. Conclusione con protezione per preservare gloss e profondità del colore.",
    procedure: [
      "Lavaggio accurato e decontaminazione chimica",
      "Clay bar per superficie liscia",
      "Asciugatura e ispezione con lampade",
      "Mascheratura guarnizioni e plastiche",
      "Correzione con lucidatrici e polish calibrati",
      "Finitura per uniformare e aumentare gloss",
      "Protezione con sigillante/cera/coating",
    ],
    products: [
      "Polish abrasivi e di finitura",
      "Compound correttivi",
      "Sigillanti/cere o coating ceramici",
      "Decontaminanti ferrosi/catramosi/resinosi",
      "Clay bar e lubrificante",
    ],
    tools: [
      "Lucidatrici rotorbitali/rotative",
      "Tamponi spugna/lana/microfibra",
      "Lampade ispezione a spettro solare",
      "Panni microfibra ad alta densità",
      "Nastro mascheratura per detailing",
    ],
    recommended: true,
  },
  {
    id: 3,
    slug: "paint-correction",
    title: "Paint correction",
    summary: "Correzione multi‑step per eliminare difetti e riflessi specchiati.",
    icon: "/images/services/icons/Paint-Correction.svg",
    iconAlt: "Icona Paint correction",
    photo: "/images/services/photos/Paint-Correction.jpeg",
    photoAlt: "Correzione della vernice",
    description:
      "Processo professionale in più passaggi (cutting, polishing, finishing) per rimuovere fino al 90–95% dei difetti visibili e ottenere massima uniformità e brillantezza.",
    procedure: [
      "Ispezione e mappatura difetti",
      "Taglio con compound e tamponi duri",
      "Polishing intermedio per uniformare",
      "Finitura con polish ultra‑fini",
      "Controllo alogene/LED e panel wipe",
      "Protezione lunga durata (sigillante/coating)",
    ],
    products: [
      "Compound da taglio",
      "Polish medi e di finitura",
      "Panel wipe/IPA",
      "Sigillanti o coating ceramici",
      "Lubrificanti e panni microfibra",
    ],
    tools: [
      "Lucidatrici pro (RO/rotativa)",
      "Tamponi duri/medi/morbidi",
      "Lampade ispezione",
      "Panni microfibra e spazzole tampone",
      "Nastro mascheratura",
    ],
  },
  {
    id: 4,
    slug: "sanificazione-ozono",
    title: "Sanificazione interni (ozono)",
    summary: "Trattamento ossidante che elimina batteri, muffe e odori.",
    icon: "/images/services/icons/Sanificazione-Interni-Ozono.svg",
    iconAlt: "Icona Sanificazione interni con ozono",
    photo: "/images/services/photos/Sanificazione-Interni-Ozono.jpg",
    photoAlt: "Sanificazione abitacolo con ozono",
    description:
      "Ciclo professionale 40–60 minuti che diffonde ozono nell'abitacolo e nei condotti A/C, neutralizzando cariche organiche e odori. Eco‑friendly: l'ozono si riconverte in ossigeno.",
    procedure: [
      "Pulizia/igienizzazione preliminare superfici",
      "Posizionamento generatore e tenuta abitacolo",
      "Ciclo di diffusione 40–60 minuti",
      "Trattamento condotti climatizzatore",
      "Areazione e controllo odori residui",
    ],
    products: [
      "Igienizzanti per pre‑clean",
      "Neutralizzanti odori",
      "Pulitori condotti A/C (opzionale)",
      "Filtri abitacolo nuovi (opzionale)",
    ],
    tools: [
      "Generatore di ozono professionale",
      "Attivazione clima/ventilazione",
      "Timer e misurazione ciclo",
      "Panni microfibra e DPI",
    ],
  },
] as const;

/**
 * Utility functions per i servizi
 */
export const getServiceById = (id: number): ServiceItem | undefined => {
  return SERVICES_DATA.find(service => service.id === id);
};

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return SERVICES_DATA.find(service => service.slug === slug);
};

export const getRecommendedServices = (): ServiceItem[] => {
  return SERVICES_DATA.filter(service => service.recommended);
};
