import { List } from '../util/List';
import { Inc } from '../number/Inc';
import { NumberToString } from '../cast/NumberToString';
import { Matches } from '../type/Matches';

/**
 * From a tuple-like type, get the subset up to a certain index
 */
export type ListTo<
  R extends List<any>,
  N extends number,
  I extends number = 0,
  Acc extends List<any> = { length: N }
> = { 0: Acc, 1: ListTo<R, N, Inc[I], Acc & { [P in NumberToString[I]]: R[I] }> }[Matches<I, N>];
