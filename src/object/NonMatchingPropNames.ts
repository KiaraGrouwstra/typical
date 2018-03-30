/**
 * Get all property names not matching a type.
 */
export type NonMatchingPropNames<T, X> = { [K in keyof T]: T[K] extends X ? never : K }[keyof T];
