import { The, Obj, NumObj, List } from './util';
import { Inc, Dec, Add, Subtract } from './number';
import { NumbersEqual } from './comp';
import { DefinitelyYes } from './boolean';
import { ObjectHasKey } from './object';
import { NumberToString, StringToNumber } from './cast';

export type Vector<T, N extends number, I extends number = 0, Acc = { length: N }> =
  { 1: Acc, 0: Vector<T, N, Inc[I], Acc & { [P in NumberToString[I]]: T }> }[NumbersEqual<I, N>];

type ArrPrototypeMethods = 'length' | 'push' | 'pop' | 'concat' | 'join' | 'reverse' | 'shift' | 'slice' | 'sort' | 'splice' | 'unshift' | 'indexOf' | 'lastIndexOf' | 'every' | 'some' | 'forEach' | 'map' | 'filter' | 'reduce' | 'reduceRight' | 'find' | 'findIndex' | 'fill' | 'copyWithin' | 'entries' | 'keys' | 'values'
// 'toLocaleString' | 'toString' | 
// type ArrPrototype = {[K in ArrPrototypeMethods]: K };
// type ArrPrototypeHas<K extends string> = ObjectHasKey<ArrPrototype, K>;

export type ArrayProp<R extends List<any>> = R[-1];

export type TupleProp<Arr extends List<any>, I extends number> = Arr[I];
// ^ just use tpl[i]

export type TupleHasIndex<
  Arr extends List<any>,
  I extends number
> = ({[K in keyof Arr]: '1' } & Array<'0'>)[StringToNumber[I]];
// ^ #15768, TS2536 `X cannot be used to index Y` on generic

// export type TupleHasElem = ...
// // check whether a tuple type contains a given type among its elements. This could be done given `TypesEq` (#6606)

export type IsArrayType<T> = DefinitelyYes<ObjectHasKey<T, ArrPrototypeMethods>>

// parallel to lists with known length

export type AppendNumObj<
  R extends NumObj<any>,
  T,
  Len extends number = Length<R>
> = R & { [P in NumberToString[Len]]: T };
// ^ #15768

export type ConcatNumObjs<A extends NumObj<any>, B extends NumObj<any>> = 
  A & IncIndexNumbObj<B, Length<A>>;

// shared with numerical objects, though not lists with known length

export type Length<R extends NumObj<any>, I extends number = 0> =
  { 1: Length<R, Inc[I]>, 0: I }[ObjectHasKey<R, NumberToString[I]>];

export type IncIndexNumbObj<R extends NumObj<any>, N extends number, I extends number = 0 /*FirstIndex<R>*/, Acc = { length: Length<R> }> =
  { 0: Acc, 1: IncIndexNumbObj<R, N, Inc[I], Acc & { [P in NumberToString[Add<I, N>]]: R[I] }> }[ObjectHasKey<R, I>];

// shared with both numerical objects and lists with known length

// export type ListFrom<
//   R extends List<any>,
//   N extends number,
//   I extends number = N,
//   Acc extends List<any> = { length: Subtract<Length<R>, I> }
// > = { 0: Acc, 1: ListFrom<R, N, Inc[I], Acc & { [P in NumberToString[Subtract<I, N>]]: R[I] }> }[TupleHasIndex<R, I>];
// // ^ error: Excessive stack depth comparing types ... and ...

export type ListTo<
  R extends List<any>,
  N extends number,
  I extends number = 0,
  Acc extends List<any> = { length: N }
> = { 0: Acc, 1: ListTo<R, N, Inc[I], Acc & { [P in NumberToString[I]]: R[I] }> }[NumbersEqual<I, N>];

export type Reverse<
  R extends List<any>,
  I extends number = 0,
  J extends number = Length<R>,
  Acc extends List<any> = { length: J }
> = { 0: Overwrite<Acc, { length: I }>, 1: Reverse<R, Inc[I], Dec[J], Acc & { [P in NumberToString[I]]: R[J] }> }[TupleHasIndex<R, I>];
// ^ take an ArrayLike, outputs a list with known length

export type TupleLastElem<R extends List<any>, I extends number = 0> =
  { 1: TupleLastElem<R, Inc[I]>, 0: R[Dec[I]] }[TupleHasIndex<R, I>];

// export type TupleLastIndex<R extends {}> = Dec[Length<R>];
export type TupleLastIndex<R extends List<any>, I extends number = 0> =
  { 1: TupleLastIndex<R, Inc[I]>, 0: Dec[I] }[TupleHasIndex<R, I>];

// crap:

// v useless type to demo backward iteration
export type FirstElem<R extends List<any>, I extends number = Length<R>, Prev extends number = Dec[StringToNumber[I]]> =
  { 1: FirstElem<R, Prev>, 0: R[StringToNumber[I]] }[TupleHasIndex<R, Prev>];
// ^ #15768, TS2536 `X cannot be used to index Y` on generic

// v useless type to demo backward iteration
export type TupleFirstIndex<R extends List<any>, I extends number = TupleLastIndex<R>> =
  { 1: TupleFirstIndex<R, Dec[I]>, 0: Inc[I] }[TupleHasIndex<R, I>];
// ^ Generic type instantiation is excessively deep and possibly infinite

// future: 

// `...` needs #5453, so syntax errors:
// export type TupleFrom<T extends List<any>, I extends number, Acc extends List<any> = []> =
//   { 0: Acc, 1: TupleFrom<T, Inc[I], [...Acc, T[I]]> }[TupleHasIndex<T, I>];
// the<['c', 'd'], TupleFrom<['a', 'b', 'c', 'd'], 2>>();
// export type TupleTo<T extends List<any>, To extends number, I extends number = 0, Acc extends List<any>=[]> =
//   If<TupleHasIndex<T, I>, { 0: Acc; 1: TupleTo<T, To, Inc[I], [...Acc, T[I]]>; }[NumbersEqual<I, To>], T>;
// the<['a', 'b'], TupleTo<['a', 'b', 'c', 'd'], 2>>();
// export type TupleTail<R extends List<any>> = TupleFrom<R, 1>;
// the<'c', TupleTail<['a', 'b', 'c']>>();
// export type DifferenceTuples<Big extends List<any>, Small extends List<any>> = TupleFrom<Big, Length<Small>>;
// the<['c', 'd'], DifferenceTuples<['a', 'b', 'c', 'd'], [123, 456]>>();

