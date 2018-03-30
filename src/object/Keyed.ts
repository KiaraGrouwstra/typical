/**
 * Use an object type to make an object type using its keys as both keys and values.
 */
export type Keyed<T> = {[K in keyof T]: K };
