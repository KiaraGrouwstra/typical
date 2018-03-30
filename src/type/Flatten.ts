/**
 * Flatten a structure of nested tuples/arrays into a flat element type.
 */
export type Flatten<T> = {
    '1': Flatten<T extends Array<infer U> ? U : T>;
  }[T extends number ? '1' : '1'];
  