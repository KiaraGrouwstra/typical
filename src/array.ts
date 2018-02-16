import { The, Obj, NumObj, List } from './util';
import { Inc, Dec, Add, Subtract } from './number';
import { NumbersEqual } from './comp';
import { And, DefinitelyYes } from './boolean';
import { ObjectHasKey, Spread } from './object';
import { NumberToString, StringToNumber } from './cast';
import { Matches, InstanceOf } from './type';

/** Create a homogeneous tuple for a given type and size */
export type Vector<T, N extends number, I extends number = 0, Acc = { length: N }> =
  { 1: Acc, 0: Vector<T, N, Inc[I], Acc & { [P in NumberToString[I]]: T }> }[NumbersEqual<I, N>];

type ArrPrototypeMethods = 'length' | 'push' | 'pop' | 'concat' | 'join' | 'reverse' | 'shift' | 'slice' | 'sort' | 'splice' | 'unshift' | 'indexOf' | 'lastIndexOf' | 'every' | 'some' | 'forEach' | 'map' | 'filter' | 'reduce' | 'reduceRight' | 'find' | 'findIndex' | 'fill' | 'copyWithin' | 'entries' | 'keys' | 'values'
// 'toLocaleString' | 'toString' | 
// type ArrPrototype = {[K in ArrPrototypeMethods]: K };
// type ArrPrototypeHas<K extends string> = ObjectHasKey<ArrPrototype, K>;

/** Get the element of an array-like type */
export type ArrayProp<R extends List<any>> = R[-1];

/** Get the element of a tuple-like type at the given index */
export type TupleProp<Arr extends List<any>, I extends number> = Arr[I];
// ^ just use tpl[i]

/** Checks whether a tuple-like type has a (numerical) index */
export type TupleHasIndex<
  Arr extends List<any>,
  I extends number
> = ({[K in keyof Arr]: '1' } & Array<'0'>)[StringToNumber[I]];


// /** check whether a tuple type contains a given type among its elements. This could be done given `TypesEq` (#6606) */
// export type TupleHasElem = ...

/** Check whether a type is an array type */
export type IsArrayType<T> = Matches<T, any[]>;

/** Check whether a type is a tuple type */
export type IsTuple<T extends { length: number }> = And<IsArrayType<T>, InstanceOf<T['length'], number>>;

// parallel to lists with known length

/** Append a value to the end of an object type with numerical keys */
export type AppendNumObj<
  R extends NumObj<any>,
  T,
  Len extends number = Length<R>
> = R & { [P in NumberToString[Len]]: T };

/** Concatenate the values of two object types with numerical keys, analogous to `Array.prototype.concat()` */
export type ConcatNumObjs<A extends NumObj<any>, B extends NumObj<any>> = 
  A & IncIndexNumbObj<B, Length<A>>;

// shared with numerical objects, though not lists with known length

/** Get the length of a tuple-like without specified `length`, e.g. for object types with numerical keys */
export type Length<R extends NumObj<any>, I extends number = 0> =
  { 1: Length<R, Inc[I]>, 0: I }[ObjectHasKey<R, NumberToString[I]>];

/** Increase the number keys of an object type by the given amount */
export type IncIndexNumbObj<R extends NumObj<any>, N extends number, I extends number = 0 /*FirstIndex<R>*/, Acc = { length: Length<R> }> =
  { 0: Acc, 1: IncIndexNumbObj<R, N, Inc[I], Acc & { [P in NumberToString[Add<I, N>]]: R[I] }> }[ObjectHasKey<R, I>];

// shared with both numerical objects and lists with known length

// /** From a tuple-like type, get the subset starting from a certain index */
// export type ListFrom<
//   R extends List<any>,
//   N extends number,
//   I extends number = N,
//   Acc extends List<any> = { length: Subtract<Length<R>, I> }
// > = { 0: Acc, 1: ListFrom<R, N, Inc[I], Acc & { [P in NumberToString[Subtract<I, N>]]: R[I] }> }[TupleHasIndex<R, I>];
// // ^ error: Excessive stack depth comparing types ... and ...

// /** From a tuple-like type, get the subset up to a certain index */
export type ListTo<
  R extends List<any>,
  N extends number,
  I extends number = 0,
  Acc extends List<any> = { length: N }
> = { 0: Acc, 1: ListTo<R, N, Inc[I], Acc & { [P in NumberToString[I]]: R[I] }> }[Matches<I, N>];

// /** Reverse a tuple-like type to a object with numerical keys in an order opposite to that of the original type */
export type Reverse<
  R extends List<any>,
  I extends number = 0,
  J extends number = Length<R>,
  Acc extends List<any> = { length: J }
> = { 0: Spread<Acc, { length: I }>, 1: Reverse<R, Inc[I], Dec[J], Acc & { [P in NumberToString[I]]: R[J] }> }[TupleHasIndex<R, I>];
// ^ take an ArrayLike, outputs a list with known length

/** Get the last elemnt of a tuple-like type */
export type TupleLastElem<R extends List<any>, I extends number = 0> =
  { 1: TupleLastElem<R, Inc[I]>, 0: R[Dec[I]] }[TupleHasIndex<R, I>];

/** Get the last used index for a tuple-like type, assuming no gaps */
// export type TupleLastIndex<R extends {}> = Dec[Length<R>];
export type TupleLastIndex<R extends List<any>, I extends number = 0> =
  { 1: TupleLastIndex<R, Inc[I]>, 0: Dec[I] }[TupleHasIndex<R, I>];

// crap:

/** Get the first element of a tuple-like type. Same as `T[0]`, useless type intended to demo backward iteration. */
export type FirstElem<R extends List<any>, I extends number = Length<R>, Prev extends number = Dec[StringToNumber[I]]> =
  { 1: FirstElem<R, Prev>, 0: R[StringToNumber[I]] }[TupleHasIndex<R, Prev>];

/** Get the first index of a tuple-like type. Should yield `0`, useless type intended to demonstrate backward iteration. */
export type TupleFirstIndex<R extends List<any>, I extends number = TupleLastIndex<R>> =
  { 1: TupleFirstIndex<R, Dec[I]>, 0: Inc[I] }[TupleHasIndex<R, I>];

// future: 

// `...` needs #5453, so syntax errors:
// /** From a tuple-like type, get the subset starting from a certain index. Returns a tuple type. */
// export type TupleFrom<T extends List<any>, I extends number, Acc extends List<any> = []> =
//   { 0: Acc, 1: TupleFrom<T, Inc[I], [...Acc, T[I]]> }[TupleHasIndex<T, I>];
// the<['c', 'd'], TupleFrom<['a', 'b', 'c', 'd'], 2>>();
// /** From a tuple-like type, get the subset up to a certain index. Returns a tuple type. */
// export type TupleTo<T extends List<any>, To extends number, I extends number = 0, Acc extends List<any>=[]> =
//   If<TupleHasIndex<T, I>, { 0: Acc; 1: TupleTo<T, To, Inc[I], [...Acc, T[I]]>; }[Matches<To, I>], T>;
// the<['a', 'b'], TupleTo<['a', 'b', 'c', 'd'], 2>>();
// /** Get a tuple of all but the first element of a tuple-like type. */
// export type TupleTail<R extends List<any>> = TupleFrom<R, 1>;
// the<'c', TupleTail<['a', 'b', 'c']>>();
// /** Get the subset of a tuple starting from the end of another tuple. */
// export type DifferenceTuples<Big extends List<any>, Small extends List<any>> = TupleFrom<Big, Length<Small>>;
// the<['c', 'd'], DifferenceTuples<['a', 'b', 'c', 'd'], [123, 456]>>();

