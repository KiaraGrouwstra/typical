import { List } from '../util/List';
import { Omit } from '../object/Omit';

/**
 * Strip a (numerically indexed) type of its `length`.
 */
export type ListToNumObj<R extends List<any>> = Omit<R, 'length'>;
