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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6" noValidate>
      {/* Honeypot field - nascosto agli utenti ma visibile ai bot */}
      <input 
        type="text" 
        style={{ position: 'absolute', left: '-9999px' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("website")} 
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input 
            id="name" 
            aria-invalid={!!errors.name} 
            aria-describedby={errors.name ? "name-error" : undefined} 
            required 
            {...register("name")} 
            placeholder="Mario Rossi"
            className="transition-colors focus:border-primary" 
          />
          {errors.name && <p id="name-error" role="alert" aria-live="polite" className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email" 
            aria-invalid={!!errors.email} 
            aria-describedby={errors.email ? "email-error" : undefined} 
            required 
            {...register("email")} 
            placeholder="mario@email.com"
            className="transition-colors focus:border-primary"
          />
          {errors.email && <p id="email-error" role="alert" aria-live="polite" className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefono *</Label>
          <Input 
            id="phone" 
            aria-invalid={!!errors.phone} 
            aria-describedby={errors.phone ? "phone-error" : undefined} 
            required 
            {...register("phone")} 
            placeholder="+39 123 456 7890"
            className="transition-colors focus:border-primary"
          />
          {errors.phone && <p id="phone-error" role="alert" aria-live="polite" className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="date">Data *</Label>
            <Input 
              id="date" 
              type="date" 
              aria-invalid={!!errors.date} 
              aria-describedby={errors.date ? "date-error" : undefined} 
              required 
              {...register("date")}
              className="transition-colors focus:border-primary"
            />
            {errors.date && <p id="date-error" role="alert" aria-live="polite" className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Ora *</Label>
            <Input 
              id="time" 
              type="time" 
              aria-invalid={!!errors.time} 
              aria-describedby={errors.time ? "time-error" : undefined} 
              required 
              {...register("time")}
              className="transition-colors focus:border-primary"
            />
            {errors.time && <p id="time-error" role="alert" aria-live="polite" className="text-xs text-red-500 mt-1">{errors.time.message}</p>}
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="vehicle">Tipo Veicolo *</Label>
          <select 
            id="vehicle" 
            className="h-10 rounded-md border border-input bg-background px-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" 
            aria-invalid={!!errors.vehicle} 
            aria-describedby={errors.vehicle ? "vehicle-error" : undefined} 
            required 
            {...register("vehicle")}
          >
            <option value="">Seleziona tipo veicolo</option>
            <option value="car">Auto</option>
            <option value="suv">SUV</option>
            <option value="truck">Camion</option>
            <option value="bike">Moto</option>
          </select>
          {errors.vehicle && <p id="vehicle-error" role="alert" aria-live="polite" className="text-xs text-red-500 mt-1">{errors.vehicle.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Servizio Richiesto *</Label>
          <select 
            id="service" 
            className="h-10 rounded-md border border-input bg-background px-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" 
            aria-invalid={!!errors.service} 
            aria-describedby={errors.service ? "service-error" : undefined} 
            required 
            {...register("service")}
          >
            <option value="">Seleziona servizio</option>
            <option value="interior-detailing">Detailing Interni</option>
            <option value="exterior-detailing">Detailing Esterni</option>
            <option value="engine-detailing">Pulizia Vano Motore</option>
            <option value="stains-removal">Rimozione Macchie</option>
            <option value="paint-protection">Protezione Vernice</option>
            <option value="windows-tinting">Oscuramento Vetri</option>
          </select>
          {errors.service && <p id="service-error" role="alert" aria-live="polite" className="text-xs text-red-500 mt-1">{errors.service.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Note aggiuntive</Label>
        <Textarea 
          id="notes" 
          rows={4} 
          maxLength={500}
          {...register("notes")} 
          placeholder="Richieste particolari o informazioni aggiuntive (opzionale)"
          className="resize-none transition-colors focus:border-primary max-h-32"
        />
        <p className="text-xs text-muted-foreground">Massimo 500 caratteri</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          aria-disabled={isSubmitting} 
          className="flex-1 sm:flex-none sm:min-w-[200px] font-medium"
        >
          {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
        </Button>
        <p className="text-xs text-muted-foreground self-center">
          Ti ricontatteremo entro 24 ore
        </p>
      </div>
    </form>
  );
}
