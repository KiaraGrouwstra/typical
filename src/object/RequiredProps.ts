import { RequiredPropNames } from './RequiredPropNames';

/**
 * Get all properties with types that don't include undefined.
 */
export type RequiredProps<T> = Pick<T, RequiredPropNames<T>>;
