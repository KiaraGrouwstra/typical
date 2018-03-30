import { List } from '../util/List';
import { TupleHasIndex } from '../array/TupleHasIndex';
import { Spread } from '../object/Spread';
import { Inc } from '../number/Inc';

/**
 * Creates a new object out of a list of keys and a list of values.
 * @see http://ramdajs.com/docs/#zipObj
 */
export type ZipObjectFn<R extends List<string>, R2 extends List<any>, I extends number = 0, T = {}> =
  { 1: ZipObjectFn<R, R2, Inc[I], Spread<T, { [P in R[I]]: R2[I] }>>, 0: T }[TupleHasIndex<R, I>];
