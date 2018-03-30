/**
 * Get the disjoint union of two types, yielding `never` for types satisfying neither/both.
 * @see https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-360862303
 */
export type Xor<T, A, B> = T extends A ? (T extends B ? never : T) : (T extends B ? T : never);
