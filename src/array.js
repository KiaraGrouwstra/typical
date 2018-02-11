// @flow
import { The, Obj, NumObj, List } from './util';
import { Inc, Dec, Add, Subtract } from './number';
import { NumbersEqual } from './comp';
import { DefinitelyYes } from './boolean';
import { ObjectHasKey } from './object';
import { NumberToString, StringToNumber } from './cast';

export type Vector<T, N: number, I: number = 0, Acc = { length: N }> =
  $ElementType<{ 1: Acc, 0: Vector<T, N, Inc<I>, Acc & { [P in NumberToString<I>]: T }> }, NumbersEqual<I, N>>;

type ArrPrototypeMethods = 'length' | 'push' | 'pop' | 'concat' | 'join' | 'reverse' | 'shift' | 'slice' | 'sort' | 'splice' | 'unshift' | 'indexOf' | 'lastIndexOf' | 'every' | 'some' | 'forEach' | 'map' | 'filter' | 'reduce' | 'reduceRight' | 'find' | 'findIndex' | 'fill' | 'copyWithin' | 'entries' | 'keys' | 'values'
// 'toLocaleString' | 'toString' | 
// type ArrPrototype = {[K in ArrPrototypeMethods]: K };
// type ArrPrototypeHas<K: string> = ObjectHasKey<ArrPrototype, K>;

export type ArrayProp<R: List<any>> = $ElementType<R, -1>;

export type TupleHasIndex<
  Arr: List<any>,
  I: number
> = $ElementType<$TupleMap<Arr, () => '1'> & Array<'0'>, StringToNumber<I>>;

// export type TupleHasElem = ...
// // check whether a tuple type contains a given type among its elements. This could be done given `TypesEq` (#6606)

export type IsArrayType<T> = DefinitelyYes<ObjectHasKey<T, ArrPrototypeMethods>>

// parallel to lists with known length

export type AppendNumObj<
  R: NumObj<any>,
  T,
  Len: number = Length<R>
> = R & { [P in NumberToString<Len>]: T };

export type ConcatNumObjs<A: NumObj<any>, B: NumObj<any>> = 
  A & IncIndexNumbObj<B, Length<A>>;

// shared with numerical objects, though not lists with known length

export type Length<R: NumObj<any>, I: number = 0> =
  $ElementType<{ 1: Length<R, Inc<I>>, 0: I }, ObjectHasKey<R, NumberToString<I>>>;

export type IncIndexNumbObj<R: NumObj<any>, N: number, I: number = 0 /*FirstIndex<R>*/, Acc = { length: Length<R> }> =
  $ElementType<{ 0: Acc, 1: IncIndexNumbObj<R, N, Inc<I>, Acc & { [P in NumberToString<Add<I, N>>]: $ElementType<R, I> }> }, ObjectHasKey<R, I>>;

// shared with both numerical objects and lists with known length

// export type ListFrom<
//   R: List<any>,
//   N: number,
//   I: number = N,
//   Acc: List<any> = { length: Subtract<Length<R>, I> }
// > = $ElementType<{ 0: Acc, 1: ListFrom<R, N, Inc<I>, Acc & { [P in NumberToString<Subtract<I, N>>]: $ElementType<R, I> }> }, TupleHasIndex<R, I>>;
// // ^ error: Excessive stack depth comparing types ... and ...

export type ListTo<
  R: List<any>,
  N: number,
  I: number = 0,
  Acc: List<any> = { length: N }
> = $ElementType<{ 0: Acc, 1: ListTo<R, N, Inc<I>, Acc & { [P in NumberToString<I>]: $ElementType<R, I> }> }, NumbersEqual<I, N>>;

export type Reverse<
  R: List<any>,
  I: number = 0,
  J: number = Length<R>,
  Acc: List<any> = { length: J }
> = $ElementType<{ 0: Overwrite<Acc, { length: I }>, 1: Reverse<R, Inc<I>, Dec<J>, Acc & { [P in NumberToString<I>]: $ElementType<R, J> }> }, TupleHasIndex<R, I>>;
// ^ take an ArrayLike, outputs a list with known length

export type TupleLastElem<R: List<any>, I: number = 0> =
  $ElementType<{ 1: TupleLastElem<R, Inc<I>>, 0: $ElementType<R, Dec<I>> }, TupleHasIndex<R, I>>;

// export type TupleLastIndex<R: {}> = Dec<Length<R>>;
export type TupleLastIndex<R: List<any>, I: number = 0> =
  $ElementType<{ 1: TupleLastIndex<R, Inc<I>>, 0: Dec<I> }, TupleHasIndex<R, I>>;

// crap:

// v useless type to demo backward iteration
export type FirstElem<R: List<any>, I: number = Length<R>, Prev: number = Dec<StringToNumber<I>>> =
  $ElementType<{ 1: FirstElem<R, Prev>, 0: $ElementType<R, StringToNumber<I>> }, TupleHasIndex<R, Prev>>;

// v useless type to demo backward iteration
export type TupleFirstIndex<R: List<any>, I: number = TupleLastIndex<R>> =
  $ElementType<{ 1: TupleFirstIndex<R, Dec<I>>, 0: Inc<I> }, TupleHasIndex<R, I>>;

// future: 

// `...` needs #5453, so syntax errors:
// export type TupleFrom<T: List<any>, I: number, Acc: List<any> = []> =
//   $ElementType<{ 0: Acc, 1: TupleFrom<T, Inc<I>, [...Acc, $ElementType<T, I>]> }, TupleHasIndex<T, I>>;
// the<['c', 'd'], TupleFrom<['a', 'b', 'c', 'd'], 2>>();
// export type TupleTo<T: List<any>, To: number, I: number = 0, Acc: List<any>=[]> =
//   If<TupleHasIndex<T, I>, $ElementType<{ 0: Acc; 1: TupleTo<T, To, Inc<I>, [...Acc, $ElementType<T, I>]>; }, NumbersEqual<I, To>>, T>;
// the<['a', 'b'], TupleTo<['a', 'b', 'c', 'd'], 2>>();
// export type TupleTail<R: List<any>> = TupleFrom<R, 1>;
// the<'c', TupleTail<['a', 'b', 'c']>>();
// export type DifferenceTuples<Big: List<any>, Small: List<any>> = TupleFrom<Big, Length<Small>>;
// the<['c', 'd'], DifferenceTuples<['a', 'b', 'c', 'd'], [123, 456]>>();

