import { List } from '../util/List';
import { TupleHasIndex } from '../array/TupleHasIndex';
import { Spread } from '../object/Spread';
import { Inc } from '../number/Inc';

/**
 * Creates a new object from a list key-value pairs.
 * If a key appears in multiple pairs, the rightmost pair is included in the object.
 * @see http://ramdajs.com/docs/#fromPairs
 */
export type FromPairsFn<R extends List<[string|number, any]>, I extends number = 0, T = {}> =
  { 1: FromPairsFn<R, Inc[I], Spread<T, { [P in R[I][0]]: R[I][1] }>>, 0: T }[TupleHasIndex<R, I>];
