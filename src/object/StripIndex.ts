/**
 * Strip an object type of its string index.
 */
export type StripIndex<T> = { [P in keyof T]: string extends P ? never : T[P] };
