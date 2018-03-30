import { NonMatchingPropNames } from './NonMatchingPropNames';

/**
 * Get all properties with names not matching a type.
 */
export type NonMatchingProps<T, X> = Pick<T, NonMatchingPropNames<T, X>>;
