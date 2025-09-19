"use client";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import * as React from "react";
import FocusTrap from "focus-trap-react";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggleMenu = () => setIsOpen((v) => !v);
  
  // Chiudi menu con Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#" aria-label="Ukiyo Crew home" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-widest text-primary">UKIYO CREW</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Navigazione principale">
          <Link href="#services" className="text-sm hover:underline underline-offset-4">Servizi</Link>
          <Link href="#gallery" className="text-sm hover:underline underline-offset-4">Galleria</Link>
          <Link href="#about" className="text-sm hover:underline underline-offset-4">Chi siamo</Link>
          <Link href="#contact" className="text-sm hover:underline underline-offset-4">Contatti</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="#contact">Prenota</Link>
          </Button>
          <button
            aria-label="Apri/chiudi menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded md:hidden border border-border"
            onClick={handleToggleMenu}
          >
            <span className="i-[menu] sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </Container>
      {isOpen && (
        <FocusTrap
          focusTrapOptions={{
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            escapeDeactivates: false,
            returnFocusOnDeactivate: true
          }}
        >
          <div id="mobile-menu" className="md:hidden border-t border-border">
            <Container className="py-3">
              <nav className="grid gap-2" aria-label="Menu mobile">
                <Link 
                  href="#services" 
                  className="py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Servizi
                </Link>
                <Link 
                  href="#gallery" 
                  className="py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Galleria
                </Link>
                <Link 
                  href="#about" 
                  className="py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Chi siamo
                </Link>
                <Link 
                  href="#contact" 
                  className="py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Contatti
                </Link>
                <Button asChild className="mt-2">
                  <Link href="#contact" onClick={() => setIsOpen(false)}>Prenota</Link>
                </Button>
                <button
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  onClick={() => setIsOpen(false)}
                  aria-label="Chiudi menu"
                >
                  Chiudi (ESC)
                </button>
              </nav>
            </Container>
          </div>
        </FocusTrap>
      )}
    </header>
  );
};


