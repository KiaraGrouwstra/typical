/**
 * Get the values of an object type as a union.
 */
export type ObjectValsToUnion<O> = O[keyof O];
