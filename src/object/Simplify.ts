/**
 * Simplify an object type to strip out intersections.
 */
export type Simplify<T> = Pick<T, keyof T>;
