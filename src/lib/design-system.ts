/**
 * Design System Centralizzato
 * Definisce spacing, dimensioni e variabili comuni per UI/UX coerente
 */

export const spacing = {
  xs: 'gap-2',      // 0.5rem - 8px
  sm: 'gap-3',      // 0.75rem - 12px
  md: 'gap-4',      // 1rem - 16px
  lg: 'gap-6',      // 1.5rem - 24px
  xl: 'gap-8',      // 2rem - 32px
  '2xl': 'gap-10',  // 2.5rem - 40px
  '3xl': 'gap-12',  // 3rem - 48px
  '4xl': 'gap-16',  // 4rem - 64px
} as const;

export const padding = {
  xs: 'p-2',        // 0.5rem - 8px
  sm: 'p-3',        // 0.75rem - 12px
  md: 'p-4',        // 1rem - 16px
  lg: 'p-6',        // 1.5rem - 24px
  xl: 'p-8',        // 2rem - 32px
  '2xl': 'p-10',    // 2.5rem - 40px
  '3xl': 'p-12',    // 3rem - 48px
} as const;

export const margin = {
  xs: 'mt-2',       // 0.5rem - 8px
  sm: 'mt-3',       // 0.75rem - 12px
  md: 'mt-4',       // 1rem - 16px
  lg: 'mt-6',       // 1.5rem - 24px
  xl: 'mt-8',       // 2rem - 32px
  '2xl': 'mt-10',   // 2.5rem - 40px
  '3xl': 'mt-12',   // 3rem - 48px
  '4xl': 'mt-16',   // 4rem - 64px
} as const;

export const text = {
  // Headings
  h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',
  h2: 'text-3xl sm:text-4xl font-bold tracking-tight',
  h3: 'text-2xl sm:text-3xl font-semibold tracking-tight',
  h4: 'text-xl sm:text-2xl font-semibold',
  h5: 'text-lg sm:text-xl font-medium',
  
  // Body
  base: 'text-base',
  sm: 'text-sm',
  xs: 'text-xs',
  
  // Special
  lead: 'text-lg sm:text-xl text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
  caption: 'text-xs text-muted-foreground',
} as const;

export const radius = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

export const transitions = {
  fast: 'transition-all duration-150',
  base: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  
  // Specifiche
  colors: 'transition-colors duration-200',
  opacity: 'transition-opacity duration-300',
  transform: 'transition-transform duration-300',
} as const;

export const animations = {
  fadeIn: 'animate-in fade-in duration-500',
  fadeOut: 'animate-out fade-out duration-300',
  slideIn: 'animate-in slide-in-from-bottom-4 duration-500',
  slideOut: 'animate-out slide-out-to-bottom-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-300',
  scaleOut: 'animate-out zoom-out-95 duration-300',
} as const;

export const shadows = {
  sm: 'shadow-sm',
  base: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
} as const;

export const borders = {
  base: 'border border-border',
  muted: 'border border-white/10',
  accent: 'border-2 border-primary',
} as const;

// Breakpoints per responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Componenti UI comuni
export const components = {
  card: `${radius.lg} ${borders.muted} bg-white/5 ${padding.lg}`,
  section: `py-16 sm:py-20 lg:py-24`,
  container: 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8',
} as const;
