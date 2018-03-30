import { NonMatchingPropNames } from './NonMatchingPropNames';

/**
 * Get all property names holding non-functions.
 */
export type NonFunctionPropNames<T> = NonMatchingPropNames<T, Function>;
