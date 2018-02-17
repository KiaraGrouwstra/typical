import { NumObj, List, If } from './util';
import { Inc, Dec, Add, Subtract } from './number';
import { ObjectHasKey, Spread } from './object';
import { TupleHasIndex, ListFrom } from './array';
import { NumberToString, StringToNumber } from './cast';

/**
 * type operations for 'lists' -- numerically-indexed types (tuple/object) with explicit `length`.
 * outputs are not tuple types but similar 'list' objects, because we can't manipulate tuples yet.
 * 
 * Examples:
 * - `[number, string]` (tuple: fixed-length array)
 * - `{ 0: number, 1: string, length: 2 }` (`ArrayLike` with known `length`, which includes tuples)
 * 
 * @preferred
 */

// parallel to arrays / numerical objects

/**
 * Append a value (type) to a numerically indexed type with explicit `length`, e.g. tuple. Returns a numerical object type.
 */
export type AppendList<
  R extends List<any>,
  T,
  Len extends number = LengthList<R>
> = Spread<R & { [P in NumberToString[Len]]: T }, { length: Inc[Len] }>;

/**
 * Append two numerically indexed types with explicit `length`, e.g. tuple types. Returns a numerical object type.
 */
export type ConcatLists<A extends List<any>, B extends List<any>> = 
  Spread<A & IncIndex<B, A['length']>, { length: Add<A['length'], B['length']> }>;

/**
 * Returns the length of a numerically indexed type with explicit `length`, e.g. tuple.
 */
export type LengthList<R extends List<any>> = R['length'];

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

// shared between numerical objects, including lists with known length

/**
 * Get the first index of a tuple-like type.
 * Should yield `0`, useless type intended to demonstrate backward iteration.
 */
export type FirstIndex<R extends NumObj<any>, I extends number = 0> =
  { 1: I, 0: FirstIndex<R, Inc[I]> }[ObjectHasKey<R, NumberToString[I]>];

/**
 * Increase the indexes on a numerically indexed object by a given amount.
 */
export type IncIndex<R extends List<any>, N extends number, I extends number = 0 /*FirstIndex<R>*/, Acc = { length: R['length'] }> =
  { 0: Acc, 1: IncIndex<R, N, Inc[I], Acc & { [P in NumberToString[Add<I, N>]]: R[I] }> }[ObjectHasKey<R, NumberToString[I]>];

// unique

/**
 * Decrease the indexes on a numerically indexed object by a given amount.
 */
export type DecIndex<R extends List<any>, N extends number, I extends number = FirstIndex<R>, Acc = { length: R['length'] }> =
  { 0: Acc, 1: DecIndex<R, N, Inc[I], Acc & { [P in NumberToString[Subtract<I, N>]]: R[I] }> }[ObjectHasKey<R, NumberToString[I]>];

/**
 * Decrease the indexes on a numerically indexed object such an amount as
 * to lower the first one to `0`.
 */
export type ZeroIndex<R extends List<any>, I extends number = FirstIndex<R>> = If<ObjectHasKey<R, NumberToString[0]>, R, DecIndex<R, I, I>>;

/**
 * Prepend an element to a tuple-like type, returning a numerical object.
 * Presumes the list is already zero-indexed, otherwise needs `ZeroIndex`.
 */
export type Prepend<
  R extends List<any>,
  T
> = { 0: T } & IncIndex<R, 1>;

/**
 * Return the subset of a tuple-like type containing all but the first element.
 */
export type ListTail<R extends List<any>> = ListFrom<R, 1>;

/**
 * Filter a tuple-like type by stripping out any indices used in a second tuple-like.
 */
export type DifferenceLists<
  Big extends List<any>,
  Small extends List<any>
> = ListFrom<Big, LengthList<Small>>;
