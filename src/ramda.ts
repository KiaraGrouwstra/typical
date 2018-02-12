import { tsst, the } from 'tsst-tycho';
import { If, List, Obj } from './util';
import { StringToNumber } from './cast';
import { TupleHasIndex } from './array';
import { Spread, HasKey } from './object';
import { Inc } from './number';

// Ramda functions listed in #12512 redone with iteration:
export type PathFn<T extends { [k: string]: any }, R extends Array<string>, I extends string = '0'> =
    { 1: PathFn<T[R[StringToNumber[I]]], R, Inc[I]>, 0: T }[TupleHasIndex<R, I>];
// export declare function path<T extends { [k: string]: any }, R extends Array<string>>(obj: T, path: R): PathFn<T, R>;

export type PathOrFn<T, Def, R extends List<string|number>, I extends number = 0> =
  { 1: If<HasKey<T, R[I]>, PathOrFn<T[R[I]], Def, R, Inc[I]>, Def>, 0: T }[TupleHasIndex<R, I>];

export type MergeAllFn<R extends List<Obj<any>>, I extends number = 0, T = {}> =
  { 1: MergeAllFn<R, Inc[I], Spread<T, R[I]>>, 0: T }[TupleHasIndex<R, I>];

export type FromPairsFn<R extends List<[string|number, any]>, I extends number = 0, T = {}> =
  { 1: FromPairsFn<R, Inc[I], Spread<T, { [P in R[I][0]]: R[I][1] }>>, 0: T }[TupleHasIndex<R, I>];

export type ZipObjectFn<R extends List<string>, R2 extends List<any>, I extends number = 0, T = {}> =
  { 1: ZipObjectFn<R, R2, Inc[I], Spread<T, { [P in R[I]]: R2[I] }>>, 0: T }[TupleHasIndex<R, I>];

// future:

// `reduce`: needs `ReturnType` (#6606) for its dynamic reducer functions. see #12512 for Ramda functions that need this.

// export type MapFn<
//     F extends (v: T) => any,
//     Tpl extends T[],
//     T,
//     I extends number = 0,
//     Acc = []
// > = { 1: MapFn<F, Tpl, T, Inc[I], [...Acc, F(Tpl[I])]>; 0: Acc; }[TupleHasIndex<Tpl, Int>];
// // ^ needs #5453
// export declare function mapTuple<F extends (v: T) => any, Tpl extends T[], T>(f: F, tpl: Tpl): MapFn<F, Tpl, T>;
// // ^ needs #6606

// // poor man's version, using a given return value rather than using `typeof` based on the given argument types:
// function curry<Args extends any[], Ret>(fn: (...args: Args) => Ret): Curried<Args, Ret>;
// type Curried<
//   ArgsAsked,
//   Ret,
//   ArgsPrevious = [] // if we can't have empty tuple I guess any[] might also destructures to nothing; that might do.
// > = <
//   ArgsGiven extends any[] = ArgsGiven,
//   ArgsAll extends [...ArgsPrevious, ...ArgsGiven]
//       = [...ArgsPrevious, ...ArgsGiven]
//   >(...args: ArgsGiven) =>
//     If<
//       TupleHasIndex<ArgsAll, TupleLastIndex<ArgsAsked>>,
//       Ret,
//       Curried<ArgsAsked, Ret, ArgsAll>
//     >;

// // robust alternative that takes into account return values dependent on input params, needs #5453 + #6606
// function curry<F>(fn: F): Curried<F>;
// type Curried<
//   F extends (...args: ArgsAsked) => any,
//   ArgsAsked extends any[] = ArgsAsked,
//   ArgsPrevious = []
// > = <
//   ArgsGiven extends any[] = ArgsGiven,
//   ArgsAll extends [...ArgsPrevious, ...ArgsGiven]
//       = [...ArgsPrevious, ...ArgsGiven]
//   >(...args: ArgsGiven) =>
//     If<
//       TupleHasIndex<ArgsAll, TupleLastIndex<ArgsAsked>>,
//       F(...[...ArgsPrevious, ...ArgsGiven]),　// #6606
//       Curried<ArgsAsked, Ret, ArgsAll>
//     >;

// // bind, needs #5453:
// interface Function {
//     bind<
//         F extends (this: T, ...args: ArgsAsked) => R,
//         ArgsAsked extends any[],
//         R extends any,
//         T,
//         Args extends any[], // tie to ArgsAsked
//         Left extends any[] = DifferenceTuples<ArgsAsked, Args>,
//         EnsureArgsMatchAsked extends 0 = ((v: Args) => 0)(TupleFrom<ArgsAsked, TupleLength<Args>>)
//         // ^ workaround to ensure we can tie `Args` to both the actual input params as well as to the desired params. it'd throw if the condition is not met.
//     >(
//         this: F,
//         thisObject: T,
//         ...args: Args
//     ): (this: any, ...rest: Left) => R;
//     // ^ `R` alt. to calc return type based on input (needs #6606): `F(this: T, ...[...Args, ...Left])`
// }
