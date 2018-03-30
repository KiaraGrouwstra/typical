import { Not } from './Not';
import { IsFalsy } from './IsFalsy';

/**
 * Checks whether a type literal is truthy.
 */
export type IsTruthy<V> = Not<IsFalsy<V>>;
