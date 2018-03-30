import { Falsy } from './Falsy';
import { Matches } from '../type/Matches';

/**
 * Checks whether a type literal is falsy.
 */
export type IsFalsy<V> = Matches<V, Falsy>;
