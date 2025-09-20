import { Container } from "@/components/layout/Container";
import Link from "next/link";
import * as React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border py-10" aria-label="Footer">
      <Container className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-xl font-bold tracking-widest text-primary">UKIYO CREW</div>
          <p className="mt-3 text-sm text-muted-foreground">Lun - Dom: 08:00 - 22:00</p>
        </div>
        <nav className="grid gap-2" aria-label="Navigazione footer">
          <Link href="#services" className="text-sm hover:underline underline-offset-4">Servizi</Link>
          <Link href="#gallery" className="text-sm hover:underline underline-offset-4">Galleria</Link>
          <Link href="#about" className="text-sm hover:underline underline-offset-4">Chi siamo</Link>
          <Link href="#contact" className="text-sm hover:underline underline-offset-4">Contatti</Link>
        </nav>
        <div className="grid gap-2 text-sm">
          <a href="tel:+18002345764" className="hover:underline underline-offset-4">+1 800 234 5764</a>
          <a href="mailto:info@ukiyocrew.com" className="hover:underline underline-offset-4">info@ukiyocrew.com</a>
          <address className="not-italic">5th Street, London, U.K.</address>
        </div>
      </Container>
      <Container className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Ukiyo Crew. Tutti i diritti riservati.</span>
        <div className="flex gap-3">
          <a href="#" aria-label="Facebook" className="hover:underline underline-offset-4">Facebook</a>
          <a href="#" aria-label="Instagram" className="hover:underline underline-offset-4">Instagram</a>
          <a href="#" aria-label="LinkedIn" className="hover:underline underline-offset-4">LinkedIn</a>
        </div>
      </Container>
    </footer>
  );
};


