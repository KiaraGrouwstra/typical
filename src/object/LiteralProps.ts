import { LiteralPropNames } from './LiteralPropNames';

/**
 * Get all properties with names that are literals, i.e. for all but the (string) index.
 */
export type LiteralProps<T> = Pick<T, LiteralPropNames<T>>;
