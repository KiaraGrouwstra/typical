/**
 * Get all property names that are literals, i.e. all but the (string) index.
 */
export type LiteralPropNames<T> = { [K in keyof T]: string extends T[K] ? never : K }[keyof T];
