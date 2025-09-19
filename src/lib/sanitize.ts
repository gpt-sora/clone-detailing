import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizza l'input utente rimuovendo tutti i tag HTML e attributi
 * Previene attacchi XSS mantenendo solo il testo pulito
 * @param input - Stringa da sanitizzare
 * @returns Stringa sanitizzata senza HTML
 */
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Rimuove tutti i tag HTML e attributi, mantiene solo il testo
  const cleaned = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
  
  // Limita la lunghezza massima per prevenire overflow
  const MAX_LENGTH = 1000;
  return cleaned.slice(0, MAX_LENGTH);
};

/**
 * Sanitizza input per campi email
 * @param email - Email da validare e sanitizzare
 * @returns Email sanitizzata o stringa vuota se non valida
 */
export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';
  
  const cleaned = sanitizeInput(email).toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(cleaned) ? cleaned : '';
};

/**
 * Sanitizza input per numeri di telefono
 * @param phone - Numero di telefono da sanitizzare
 * @returns Numero sanitizzato contenente solo cifre, spazi e simboli comuni
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone || typeof phone !== 'string') return '';
  
  // Mantiene solo numeri, spazi, +, -, (, )
  return phone.replace(/[^0-9\s+\-()]/g, '').slice(0, 20);
};
