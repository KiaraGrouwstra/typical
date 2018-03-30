import { List } from '../util/List';
import { Length } from './Length';
import { Subtract } from '../number/Subtract';
import { Inc } from '../number/Inc';
import { NumberToString } from '../cast/NumberToString';
import { TupleHasIndex } from './TupleHasIndex';

/**
 * From a tuple-like type, get the subset starting from a certain index
 */
export type ListFrom<
  R extends List<any>,
  N extends number,
  I extends number = N,
  Acc extends List<any> = { length: Subtract<Length<R>, I> }
> = { 0: Acc, 1: ListFrom<R, N, Inc[I], Acc & { [P in NumberToString[Subtract<I, N>]]: R[I] }> }[TupleHasIndex<R, I>];
