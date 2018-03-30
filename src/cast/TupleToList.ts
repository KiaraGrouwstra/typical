import { List } from '../util/List';
import { Inc } from '../number/Inc';
import { Simplify } from '../object/Simplify';
import { TupleHasIndex } from '../array/TupleHasIndex';
import { NumberToString } from '../cast/NumberToString';

/**
 * Convert a tuple-like type to an object type with number keys and explicit `length`.
 */
export type TupleToList<R extends List<any>, I extends number = 0, Acc = {}> =
  { 1: TupleToList<R, Inc[I], Acc & { [P in NumberToString[I]]: R[I] }>, 0: Simplify<Acc & { length: I }> }[TupleHasIndex<R, I>];
