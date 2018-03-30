import { List } from '../util/List';
import { Inc } from '../number/Inc';
import { Simplify } from '../object/Simplify';
import { TupleHasIndex } from '../array/TupleHasIndex';
import { NumberToString } from '../cast/NumberToString';

/**
 * Convert a tuple-like type to an object type with number keys.
 */
export type TupleToObject<R extends List<any>, I extends number = 0, Acc = {}> =
  { 1: TupleToObject<R, Inc[I], Acc & { [P in NumberToString[I]]: R[I] }>, 0: Simplify<Acc> }[TupleHasIndex<R, I>];
