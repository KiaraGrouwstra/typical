import { OptionalPropNames } from './OptionalPropNames';

/**
 * Get all properties that include undefined.
 */
export type OptionalProps<T> = Pick<T, OptionalPropNames<T>>;
