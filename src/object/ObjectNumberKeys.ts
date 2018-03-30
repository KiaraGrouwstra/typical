import { NumberToNumber } from '../cast/NumberToNumber';

/**
 * A `number` variant of `keyof`, giving a union of a tuple/object with number-like keys.
 * Technically returns string literals e.g. `"3"` rather than `3` -- works for element access.
 */
export type ObjectNumberKeys<T> = Extract<keyof T, keyof NumberToNumber>;
