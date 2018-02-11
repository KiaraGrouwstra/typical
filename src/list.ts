import { NumObj, List } from './util';
import { Inc, Add } from './number';
import { ObjectHasKey, Spread } from './object';
import { TupleHasIndex, ListFrom } from './array';
import { NumberToString, StringToNumber } from './cast';

// parallel to arrays / numerical objects

export type AppendList<
  R extends List<any>,
  T,
  Len extends number = LengthList<R>
> = Spread<R & { [P in NumberToString[Len]]: T }, { length: Inc[StringToNumber[Len]] }>;

export type ConcatLists<A extends List<any>, B extends List<any>> = 
  Spread<A & IncIndex<B, A['length']>, { length: Add<A['length'], B['length']> }>;

export type LengthList<R extends List<any>> = R['length'];

export type ReverseList<
  R extends List<any>,
  I extends number = 0,
  J extends number = LengthList<R>,
  Acc extends List<any> = { length: number }
> = { 0: Spread<Acc, { length: I }>, 1: ReverseList<R, Inc[I], Dec[J], Acc & { [P in NumberToString[I]]: R[J] }> }[TupleHasIndex<R, I>];
// ^ take an ArrayLike, outputs a list with known length

// shared between numerical objects, including lists with known length

export type FirstIndex<R extends NumObj<any>, I extends number = 0> =
  { 1: I, 0: FirstIndex<R, Inc[I]> }[ObjectHasKey<R, NumberToString[I]>];

export type IncIndex<R extends List<any>, N extends number, I extends number = 0 /*FirstIndex<R>*/, Acc = { length: R['length'] }> =
  { 0: Acc, 1: IncIndex<R, N, Inc[I], Acc & { [P in NumberToString[Add<I, N>]]: R[I] }> }[ObjectHasKey<R, I>];

// unique

export type DecIndex<R extends List<any>, N extends number, I extends number = FirstIndex<R>, Acc = { length: R['length'] }> =
  { 0: Acc, 1: DecIndex<R, N, Inc[I], Acc & { [P in NumberToString[Subtract<I, N>]]: R[I] }> }[ObjectHasKey<R, I>];

export type ZeroIndex<R extends List<any>, I extends number = FirstIndex<R>> = /*If<ObjectHasKey<R, 0>, R,*/ DecIndex<R, I, I>//>;

export type Prepend<
  R extends List<any>,
  T
> = { 0: T } & IncIndex<R, 1>;
// presumes the list is already zero-indexed, otherwise needs ZeroIndex

export type ListTail<R extends List<any>> = ListFrom<R, 1>;

export type DifferenceLists<
  Big extends List<any>,
  Small extends List<any>
> = ListFrom<Big, LengthList<Small>>;
