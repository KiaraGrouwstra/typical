import { IsTruthy } from '../boolean/IsTruthy';

/**
 * Converts a type to a string bool, analogous to `Boolean` or `!!`.
 * @deprecated
 */
export type ToBool<T> = IsTruthy<T>;
