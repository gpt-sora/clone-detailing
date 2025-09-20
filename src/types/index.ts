/**
 * TypeScript utility types per migliorare type safety
 * Seguendo le best practices delle regole globali
 */

// Branded types per validazione type-safe
export type EmailAddress = string & { readonly __brand: 'EmailAddress' };
export type PhoneNumber = string & { readonly __brand: 'PhoneNumber' };
export type ServiceSlug = string & { readonly __brand: 'ServiceSlug' };

// Utility types per API responses
export type ApiResponse<T> = {
  ok: true;
  data: T;
} | {
  ok: false;
  error: string;
  details?: unknown;
};

// Strict pick per oggetti con chiavi opzionali
export type StrictPick<T, K extends keyof T> = {
  [P in K]-?: T[P];
};

// Deep readonly per configurazioni immutabili
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Utility per form states
export type FormState<T> = {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
};

// Type guards per runtime validation
export const isEmailAddress = (value: string): value is EmailAddress => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isPhoneNumber = (value: string): value is PhoneNumber => {
  const phoneRegex = /^(\+39|0039|39)?[\s\-]?[0-9]{2,3}[\s\-]?[0-9]{6,8}$/;
  return phoneRegex.test(value);
};

// Assertion functions per validazione
export function assertIsEmailAddress(value: string): asserts value is EmailAddress {
  if (!isEmailAddress(value)) {
    throw new Error(`Invalid email address: ${value}`);
  }
}

export function assertIsPhoneNumber(value: string): asserts value is PhoneNumber {
  if (!isPhoneNumber(value)) {
    throw new Error(`Invalid phone number: ${value}`);
  }
}

// Conditional types per logica complessa
export type NonEmptyArray<T> = [T, ...T[]];

export type RequiredKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Template literal types per string manipulation
export type Kebab<T extends string> = T extends `${infer A}${infer B}`
  ? B extends Uncapitalize<B>
    ? `${Uncapitalize<A>}${Kebab<B>}`
    : `${Uncapitalize<A>}-${Kebab<Uncapitalize<B>>}`
  : T;

export type Pascal<T extends string> = T extends `${infer A}-${infer B}`
  ? `${Capitalize<A>}${Pascal<Capitalize<B>>}`
  : Capitalize<T>;
