"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const BookingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (values: BookingInput) => {
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Errore invio");
      }
      toast.success("Richiesta inviata! Ti ricontatteremo a breve.");
      reset();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Errore inaspettato";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <input type="text" className="hidden" tabIndex={-1} aria-hidden {...register("website")} />
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} required {...register("name")} placeholder="Mario Rossi" />
          {errors.name && <p id="name-error" className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} required {...register("email")} placeholder="mario@email.com" />
          {errors.email && <p id="email-error" className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Telefono</Label>
          <Input id="phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} required {...register("phone")} placeholder="+39 ..." />
          {errors.phone && <p id="phone-error" className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="date">Data</Label>
            <Input id="date" type="date" aria-invalid={!!errors.date} aria-describedby={errors.date ? "date-error" : undefined} required {...register("date")} />
            {errors.date && <p id="date-error" className="text-xs text-red-500">{errors.date.message}</p>}
          </div>
          <div>
            <Label htmlFor="time">Ora</Label>
            <Input id="time" type="time" aria-invalid={!!errors.time} aria-describedby={errors.time ? "time-error" : undefined} required {...register("time")} />
            {errors.time && <p id="time-error" className="text-xs text-red-500">{errors.time.message}</p>}
          </div>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="vehicle">Veicolo</Label>
          <select id="vehicle" className="h-10 rounded-md border bg-background px-3 text-sm" aria-invalid={!!errors.vehicle} aria-describedby={errors.vehicle ? "vehicle-error" : undefined} required {...register("vehicle")}>
            <option value="">Seleziona</option>
            <option value="car">Auto</option>
            <option value="suv">SUV</option>
            <option value="truck">Camion</option>
            <option value="bike">Moto</option>
          </select>
          {errors.vehicle && <p id="vehicle-error" className="text-xs text-red-500">{errors.vehicle.message}</p>}
        </div>
        <div>
          <Label htmlFor="service">Servizio</Label>
          <select id="service" className="h-10 rounded-md border bg-background px-3 text-sm" aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined} required {...register("service")}>
            <option value="">Seleziona</option>
            <option value="interior-detailing">Interni</option>
            <option value="exterior-detailing">Esterni</option>
            <option value="engine-detailing">Vano motore</option>
            <option value="stains-removal">Rimozione macchie</option>
            <option value="paint-protection">Protezione vernice</option>
            <option value="windows-tinting">Oscuramento vetri</option>
          </select>
          {errors.service && <p id="service-error" className="text-xs text-red-500">{errors.service.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Note</Label>
        <Textarea id="notes" rows={4} {...register("notes")} placeholder="Richieste particolari" />
      </div>
      <Button type="submit" disabled={isSubmitting} aria-disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Invio..." : "Invia richiesta"}
      </Button>
    </form>
  );
}
