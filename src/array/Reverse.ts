import { List } from '../util/List';
import { Spread } from '../object/Spread';
import { Length } from './Length';
import { Inc } from '../number/Inc';
import { Dec } from '../number/Dec';
import { NumberToString } from '../cast/NumberToString';
import { TupleHasIndex } from './TupleHasIndex';

/**
 * Reverse a tuple-like type to a object with numerical keys in an order opposite to that of the original type
 */
export type Reverse<
  R extends List<any>,
  I extends number = 0,
  J extends number = Length<R>,
  Acc extends List<any> = { length: J }
> = { 0: Spread<Acc, { length: I }>, 1: Reverse<R, Inc[I], Dec[J], Acc & { [P in NumberToString[I]]: R[J] }> }[TupleHasIndex<R, I>];
// ^ take an ArrayLike, outputs a list with known length
