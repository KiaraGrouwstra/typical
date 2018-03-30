/**
 * Intersection of all value types.
 * @see https://github.com/Microsoft/TypeScript/pull/21496#issuecomment-363159497
 */
export type IntersectValueOf<T> = (
    { [K in keyof T]: (x: T[K]) => void }
) extends Record<keyof T, (x: infer V) => void> ? V: never;
