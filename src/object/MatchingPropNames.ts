/**
 * Get all property names matching a type.
 */
export type MatchingPropNames<T, X> = { [K in keyof T]: T[K] extends X ? K : never }[keyof T];
