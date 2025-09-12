import { cn } from "@/lib/utils";
import * as React from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
};

export const Section: React.FC<SectionProps> = ({ children, className, id, ariaLabel }) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("py-12 sm:py-16 md:py-20 lg:py-24", className)}
    >
      {children}
    </section>
  );
};


