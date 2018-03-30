/**
 * Get all names of properties with types that include undefined.
 */
export type OptionalPropNames<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];
