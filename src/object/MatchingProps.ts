import { MatchingPropNames } from './MatchingPropNames';

/**
 * Get all properties with names matching a type.
 */
export type MatchingProps<T, X> = Pick<T, MatchingPropNames<T, X>>;
