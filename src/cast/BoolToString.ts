import { Bool } from '../util/Bool';

/**
 * Map a boolean type to a string-based boolean.
 * Now we can do conditionals from real booleans like this,
 * these could be used to replace string-based booleans.
 * However, string bools still have a great use, as `{ 0: ..., 1: ... }` 
 * constructions create a wrapper that enables type recursion.
 */
export type BoolToString<T extends boolean> =
    T extends true ? '1' :
    T extends false ? '0' :
    T extends boolean ? Bool :
    never;
