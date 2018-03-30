import { Matches } from '../type/Matches';

/** 
 * Check whether a type is an array type
 */
export type IsArrayType<T> = Matches<T, any[]>;
