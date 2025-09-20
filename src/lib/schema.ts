import { z } from "zod";

// Regex patterns per validazione avanzata
const PHONE_REGEX = /^(\+39|0039|39)?[\s\-]?[0-9]{2,3}[\s\-]?[0-9]{6,8}$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
const TIME_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Custom validators
const validateFutureDate = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate >= today;
};

const validateBusinessHours = (timeString: string): boolean => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;
  const openTime = 8 * 60; // 08:00
  const closeTime = 22 * 60; // 22:00
  return timeInMinutes >= openTime && timeInMinutes <= closeTime;
};

export const bookingSchema = z.object({
  // Nome con validazione caratteri e lunghezza
  name: z
    .string()
    .min(2, "Nome troppo corto (minimo 2 caratteri)")
    .max(50, "Nome troppo lungo (massimo 50 caratteri)")
    .regex(NAME_REGEX, "Nome contiene caratteri non validi")
    .transform(str => str.trim()),

  // Email con validazione avanzata
  email: z
    .string()
    .email("Email non valida")
    .max(254, "Email troppo lunga") // RFC 5321 limit
    .transform(str => str.toLowerCase().trim()),

  // Telefono con regex italiana
  phone: z
    .string()
    .min(6, "Telefono troppo corto")
    .max(20, "Telefono troppo lungo")
    .regex(PHONE_REGEX, "Formato telefono non valido (es: +39 123 456789)")
    .transform(str => str.replace(/[\s\-]/g, '')), // Rimuove spazi e trattini

  // Veicolo enum strict
  vehicle: z.enum(["car", "suv", "truck", "bike"], { 
    message: "Seleziona un tipo di veicolo valido"
  }),

  // Servizio enum strict - solo servizi effettivamente disponibili
  service: z.enum([
    "detailing-interno",
    "lucidatura-carrozzeria",
    "paint-correction", 
    "sanificazione-ozono",
    "ceramic-coating",
    "ppf-wrapping",
  ], { 
    message: "Seleziona un servizio valido"
  }),

  // Data con validazione futuro
  date: z
    .string()
    .min(1, "Data richiesta")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato data non valido (YYYY-MM-DD)")
    .refine(validateFutureDate, "La data deve essere oggi o nel futuro"),

  // Ora con validazione formato e orari business
  time: z
    .string()
    .min(1, "Ora richiesta")
    .regex(TIME_REGEX, "Formato ora non valido (HH:MM)")
    .refine(validateBusinessHours, "Orario non disponibile (08:00-22:00)"),

  // Note con lunghezza limitata e sanitizzazione
  notes: z
    .string()
    .max(500, "Note troppo lunghe (massimo 500 caratteri)")
    .optional()
    .transform(str => str ? str.trim() : ""),

  // Honeypot - deve rimanere vuoto
  website: z
    .string()
    .max(0, "Campo non deve essere compilato")
    .default(""),
});

// Tipo base inferito da Zod
export type BookingData = z.infer<typeof bookingSchema>;

// Tipo per il form (prima della trasformazione Zod)
export type BookingInput = {
  name: string;
  email: string;
  phone: string;
  vehicle: "car" | "suv" | "truck" | "bike";
  service: "detailing-interno" | "lucidatura-carrozzeria" | "paint-correction" | "sanificazione-ozono" | "ceramic-coating" | "ppf-wrapping";
  date: string;
  time: string;
  notes?: string;
  website?: string;
};


