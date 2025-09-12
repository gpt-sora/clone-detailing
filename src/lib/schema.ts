import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Nome troppo corto"),
  email: z.string().email("Email non valida"),
  phone: z.string().min(6, "Telefono non valido"),
  vehicle: z.enum(["car", "suv", "truck", "bike"], { error: "Seleziona un veicolo" }),
  service: z.enum(
    [
      "interior-detailing",
      "exterior-detailing",
      "engine-detailing",
      "stains-removal",
      "paint-protection",
      "windows-tinting",
    ],
    { error: "Seleziona un servizio" }
  ),
  date: z.string().min(1, "Data richiesta"),
  time: z.string().min(1, "Ora richiesta"),
  notes: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
});

export type BookingInput = z.infer<typeof bookingSchema>;


