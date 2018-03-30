import { List } from '../util/List';

/**
 * Returns the length of a numerically indexed type with explicit `length`, e.g. tuple.
 */
export type LengthList<R extends List<any>> = R['length'];
