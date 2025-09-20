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
    photo: "/images/services/photos/Paint-Correction.jpeg?v=2",
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
  {
    id: 5,
    slug: "ceramic-coating",
    title: "Ceramic coating",
    summary: "Protezione ceramica avanzata per brillantezza e durabilità estrema.",
    icon: "/images/services/icons/Paint-Correction.svg", // TODO: Sostituire con Ceramic-Coating.svg
    iconAlt: "Icona Ceramic coating",
    photo: "/images/services/photos/Ceramic-Coating.jpg",
    photoAlt: "Applicazione ceramic coating",
    description:
      "Rivestimento nanotecnologico che crea una barriera protettiva permanente sulla vernice. Offre protezione superiore contro UV, agenti chimici, graffi e facilita la manutenzione quotidiana con effetto idrorepellente.",
    procedure: [
      "Lavaggio e decontaminazione completa della superficie",
      "Clay bar per rimuovere contaminanti incorporati",
      "Paint correction per superficie perfettamente liscia",
      "Panel wipe con alcool isopropilico per rimuovere residui",
      "Applicazione coating ceramico a strati incrociati",
      "Curing time 12-24 ore in ambiente controllato",
      "Controllo qualità e test idrorepellenza",
    ],
    products: [
      "Coating ceramico professionale (SiO2 9H+)",
      "Panel wipe e alcool isopropilico",
      "Applicatori in microfibra di precisione",
      "Infrared curing lamps per accelerare il processo",
      "Maintenance spray specifico per coating",
    ],
    tools: [
      "Lucidatrici per paint correction preliminare",
      "Applicatori certificati per coating",
      "Lampade a infrarossi per curing",
      "Panni microfibra lint-free",
      "Ambiente controllato (temperatura/umidità)",
    ],
    recommended: true,
  },
  {
    id: 6,
    slug: "ppf-wrapping",
    title: "PPF e wrapping",
    summary: "Pellicola protettiva trasparente e wrapping personalizzato per protezione totale.",
    icon: "/images/services/icons/Lucidatura-Carrozzeria.svg", // TODO: Sostituire con PPF-Wrapping.svg
    iconAlt: "Icona PPF e wrapping",
    photo: "/images/services/photos/PPF-Wrapping.jpeg?v=1",
    photoAlt: "Installazione PPF e wrapping",
    description:
      "Paint Protection Film (PPF) in poliuretano termoplastico che protegge da sassi, graffi e agenti atmosferici. Include servizi di wrapping personalizzato per cambi colore e design unici mantenendo la protezione.",
    procedure: [
      "Analisi superficie e misurazione pannelli",
      "Pre-taglio digitale della pellicola su plotter",
      "Pulizia approfondita e sgrassaggio superfici",
      "Applicazione con solution slip per posizionamento",
      "Squeegee e rimozione bolle d'aria",
      "Attivazione adesivo con heat gun controllato",
      "Rifinitura bordi e controllo qualità finale",
    ],
    products: [
      "PPF premium autoriparante (3M, XPEL, SunTek)",
      "Vinyl wrapping di alta qualità",
      "Solution slip per applicazione",
      "Primer adesione per superfici difficili",
      "Edge sealer per sigillatura bordi",
    ],
    tools: [
      "Plotter da taglio digitale",
      "Heat gun professionale con controllo temperatura",
      "Squeegee in feltro e plastica",
      "Cutter di precisione e lame curve",
      "Infrared thermometer per controllo temperatura",
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
