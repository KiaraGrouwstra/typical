// @flow
import { NumObj, List } from './util';
import { Inc, Add } from './number';
import { ObjectHasKey, Overwrite } from './object'; // , Simplify
import { TupleHasIndex, ListFrom } from './array';
import { NumberToString, StringToNumber } from './cast';

// parallel to arrays / numerical objects

export type AppendList<
  R: List<any>,
  T,
  Len: number = LengthList<R>
> = Overwrite<R & { [P in NumberToString<Len>]: T }, { length: Inc<StringToNumber<Len>> }>;

export type ConcatLists<A: List<any>, B: List<any>> = 
  Overwrite<A & IncIndex<B, $PropertyType<A, 'length'>>, { length: Add<$PropertyType<A, 'length'>, $PropertyType<B, 'length'>> }>;

export type LengthList<R: List<any>> = $PropertyType<R, 'length'>;

export type ReverseList<
  R: List<any>,
  I: number = 0,
  J: number = LengthList<R>,
  Acc: List<any> = { length: number }
> = $ElementType<{ 0: Overwrite<Acc, { length: I }>, 1: ReverseList<R, Inc<I>, Dec<J>, Acc & { [P in NumberToString<I>]: $ElementType<R, J> }> }, TupleHasIndex<R, I>>;
// ^ take an ArrayLike, outputs a list with known length

// shared between numerical objects, including lists with known length

export type FirstIndex<R: NumObj<any>, I: number = 0> =
  { 1: I, 0: FirstIndex<R, Inc<I>> }[ObjectHasKey<R, NumberToString<I>>];

export type IncIndex<R: List<any>, N: number, I: number = 0 /*FirstIndex<R>*/, Acc = { length: $PropertyType<R, 'length'> }> =
  $ElementType<{ 0: Acc, 1: IncIndex<R, N, Inc<I>, Acc & { [P in NumberToString<Add<I, N>>]: $ElementType<R, I> }> }, ObjectHasKey<R, I>>;

// unique

export type DecIndex<R: List<any>, N: number, I: number = FirstIndex<R>, Acc = { length: $PropertyType<R, 'length'> }> =
  $ElementType<{ 0: Acc, 1: DecIndex<R, N, Inc<I>, Acc & { [P in NumberToString<Subtract<I, N>>]: $ElementType<R, I> }> }, ObjectHasKey<R, I>>;

export type ZeroIndex<R: List<any>, I: number = FirstIndex<R>> = /*If<ObjectHasKey<R, 0>, R,*/ DecIndex<R, I, I>//>;

export type Prepend<
  R: List<any>,
  T
> = { 0: T } & IncIndex<R, 1>;
// presumes the list is already zero-indexed, otherwise needs ZeroIndex

export type ListTail<R: List<any>> = ListFrom<R, 1>;

export type DifferenceLists<
  Big: List<any>,
  Small: List<any>
> = ListFrom<Big, LengthList<Small>>;
