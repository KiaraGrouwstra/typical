import { Matches } from '../type/Matches';

/**
 * Check if an object has a string index.
 */
export type ObjectHasStringIndex<O extends {}> =
    ({ 0: '0'; } & { [k: string]: '1'; })[Matches<string, keyof O>];
