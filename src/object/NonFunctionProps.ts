import { NonMatchingProps } from './NonMatchingProps';

/**
 * Get all non-function properties.
 */
export type NonFunctionProps<T> = NonMatchingProps<T, Function>;
