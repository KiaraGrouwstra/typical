/**
 * Widen scalar types from literals to their parent types.
 */
export type Widen<T> =
  T extends boolean ? boolean :
  T extends number ? number :
  T extends string ? string :
  T;
