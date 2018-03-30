/**
 * Check whether an object has a number index.
 */
export type ObjectHasNumberIndex<T> = T extends { [i: number]: any } ? '1' : '0';
