/**
 * Yields the intersection of the keys of two objects.
 */
// export type IntersectionObjectKeys<A, B> = Pick<KeyedSafe<B>, keyof A>[keyof A];
export type IntersectionObjectKeys<A, B> = Extract<keyof A, keyof B>;
