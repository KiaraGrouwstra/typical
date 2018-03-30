import { MatchingPropNames } from './MatchingPropNames';

/**
 * Get all property names holding functions.
 */
export type FunctionPropNames<T> = MatchingPropNames<T, Function>;
