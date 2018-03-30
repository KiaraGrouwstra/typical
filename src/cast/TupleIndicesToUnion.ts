import { List } from '../util/List';
import { Inc } from '../number/Inc';
import { TupleHasIndex } from '../array/TupleHasIndex';

/**
 * Get a union of types from the indices of a tuple-like type.
 */
export type TupleIndicesToUnion<R extends List<any>, I extends number = 0, Acc = never> =
  { 1: TupleIndicesToUnion<R, Inc[I], Acc | I>, 0: Acc }[TupleHasIndex<R, I>];

