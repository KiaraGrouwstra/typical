import { tsst, the } from 'tsst-tycho';
import { If, List, Obj } from './util';
import { StringToNumber } from './cast';
import { TupleHasIndex } from './array'; //, ListFrom
import { Spread, HasKey } from './object';
import { Inc } from './number';
import { Arguments, Fn } from './function';
import { ReverseList } from './index';

/**
 * Ramda functions redone with iteration.
 * @see https://github.com/Microsoft/TypeScript/issues/12512
 * @preferred
 */

/**
 * Retrieve the value at a given path.
 * @see http://ramdajs.com/docs/#path
 */
export type PathFn<T extends { [k: string]: any }, R extends Array<string>, I extends number = 0> =
    { 1: PathFn<T[R[I]], R, Inc[I]>, 0: T }[TupleHasIndex<R, I>];
// export declare function path<T extends { [k: string]: any }, R extends Array<string>>(obj: T, path: R): PathFn<T, R>;

/**
 * If the given, non-null object has a value at the given path, returns the value at that path.
 * Otherwise returns the provided default value.
 * @see http://ramdajs.com/docs/#pathOr
 */
export type PathOrFn<T, Def, R extends List<string|number>, I extends number = 0> =
  { 1: If<HasKey<T, R[I]>, PathOrFn<T[R[I]], Def, R, Inc[I]>, Def>, 0: T }[TupleHasIndex<R, I>];

/**
 * Merges a list of objects together into one object.
 * @see http://ramdajs.com/docs/#mergeAll
 */
export type MergeAllFn<R extends List<Obj<any>>, I extends number = 0, T = {}> =
  { 1: MergeAllFn<R, Inc[I], Spread<T, R[I]>>, 0: T }[TupleHasIndex<R, I>];

/**
 * Creates a new object from a list key-value pairs.
 * If a key appears in multiple pairs, the rightmost pair is included in the object.
 * @see http://ramdajs.com/docs/#fromPairs
 */
export type FromPairsFn<R extends List<[string|number, any]>, I extends number = 0, T = {}> =
  { 1: FromPairsFn<R, Inc[I], Spread<T, { [P in R[I][0]]: R[I][1] }>>, 0: T }[TupleHasIndex<R, I>];

/**
 * Creates a new object out of a list of keys and a list of values.
 * @see http://ramdajs.com/docs/#zipObj
 */
export type ZipObjectFn<R extends List<string>, R2 extends List<any>, I extends number = 0, T = {}> =
  { 1: ZipObjectFn<R, R2, Inc[I], Spread<T, { [P in R[I]]: R2[I] }>>, 0: T }[TupleHasIndex<R, I>];

// future:

// `reduce`: needs `ReturnType` (#6606) for its dynamic reducer functions. see #12512 for Ramda functions that need this.

/**
 * `Array.prototype.map` type-safe for tuples.
 * @see http://ramdajs.com/docs/#map
 */
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

/**
 * Returns a curried equivalent of the provided function.
 * @see http://ramdajs.com/docs/#curry
 */
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

/**
 * Creates a function that is bound to a context.
 * @see http://ramdajs.com/docs/#bind
 */
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

/**
 * Performs left-to-right function composition.
 * @see http://ramdajs.com/docs/#pipe
 */
// type Pipe<Fs extends List<(...args: any[]) => any>, F = Fs[0], Args = Arguments<F>> = Fn<Args, ApplyFns<ListFrom<Fs, 1>, F(...Args)>>;
// // ^ todo: use generics so as to plug in not the static `Args` but base return value on the actual input types
// type ApplyFns<Fs extends List<(...args: any[]) => any>, V> = {
//   '1': Fs['length'] extends 0 ? V : ApplyFns<ListFrom<Fs, 1>, Fs[0](V)>
// }[V extends number ? '1' : '1'];
// type Compose<Fs extends List<(...args: any[]) => any>> = Pipe<ReverseList<Fs>>;
