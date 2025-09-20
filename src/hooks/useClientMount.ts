/**
 * Custom hook per gestire il mounting lato client
 * Utile per evitare hydration mismatch con animazioni e contenuto dinamico
 */

import * as React from 'react';

/**
 * Hook che restituisce true solo dopo il primo render lato client
 * Utile per evitare hydration mismatch con animazioni
 */
export const useClientMount = (): boolean => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

/**
 * Hook che combina client mounting con reduced motion preference
 * Utile per animazioni che devono essere disabilitate durante SSR e per accessibilità
 */
export const useAnimationReady = (): boolean => {
  const isMounted = useClientMount();
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (!isMounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isMounted]);

  return isMounted && !prefersReducedMotion;
};
