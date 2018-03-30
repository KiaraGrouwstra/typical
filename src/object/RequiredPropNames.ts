/**
 * Get all names of properties with types that don't include undefined.
 */
export type RequiredPropNames<T> = { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T];
