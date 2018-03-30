/**
 * Check if a type matches another (`<=`).
 */
export type Matches<V, T> = V extends T ? '1' : '0';
