import { List } from '../util/List';
import { LengthList } from './LengthList';
import { Inc } from '../number/Inc';
import { Dec } from '../number/Dec';
import { Spread } from '../object/Spread';
import { TupleHasIndex } from '../array/TupleHasIndex';
import { NumberToString } from '../cast/NumberToString';

/**
 * Reverse a numerically indexed type with explicit `length`, e.g. tuple.
 * Takes an ArrayLike, outputs a list with known length as an object type
 * with numerical keys.
 */
export type ReverseList<
  R extends List<any>,
  I extends number = 0,
  J extends number = LengthList<R>,
  Acc extends List<any> = { length: number }
> = { 0: Spread<Acc, { length: I }>, 1: ReverseList<R, Inc[I], Dec[J], Acc & { [P in NumberToString[I]]: R[J] }> }[TupleHasIndex<R, I>];
