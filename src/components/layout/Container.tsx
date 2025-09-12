import { cn } from "@/lib/utils";
import * as React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  ariaLabel?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as = "div",
  ariaLabel,
}) => {
  const Component = as as React.ElementType;
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8", className)}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
};


