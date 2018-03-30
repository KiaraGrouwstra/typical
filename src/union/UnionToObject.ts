/**
 * Use a union of string literals to make an object using those
 * strings as both keys and values.
 */
export type UnionToObject<Keys extends string> = { [K in Keys]: K };
