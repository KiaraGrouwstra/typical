/**
 * Omit the given keys from an object type.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
