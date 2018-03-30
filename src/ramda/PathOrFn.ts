import { If } from '../util/If';
import { List } from '../util/List';
import { TupleHasIndex } from '../array/TupleHasIndex';
import { HasKey } from '../object/HasKey';
import { Inc } from '../number/Inc';

/**
 * If the given, non-null object has a value at the given path, returns the value at that path.
 * Otherwise returns the provided default value.
 * @see http://ramdajs.com/docs/#pathOr
 */
export type PathOrFn<T, Def, R extends List<string|number>, I extends number = 0> =
  { 1: If<HasKey<T, R[I]>, PathOrFn<T[R[I]], Def, R, Inc[I]>, Def>, 0: T }[TupleHasIndex<R, I>];
