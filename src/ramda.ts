import { tsst, the } from 'tsst-tycho';
import { If, List, Obj } from './util';
import { StringToNumber } from './cast';
import { TupleHasIndex } from './array';
import { Overwrite, HasKey } from './object';
import { Inc } from './number';

// Ramda functions listed in #12512 redone with iteration:
export type PathFn<T extends { [k: string]: any }, R extends Array<string>, I extends string = '0'> =
    { 1: PathFn<T[R[StringToNumber[I]]], R, Inc[I]>, 0: T }[TupleHasIndex<R, I>];
// export declare function path<T extends { [k: string]: any }, R extends Array<string>>(obj: T, path: R): PathFn<T, R>;

export type PathOrFn<T, Def, R extends List<string|number>, I extends number = 0> =
  { 1: If<HasKey<T, R[I]>, PathOrFn<T[R[I]], Def, R, Inc[I]>, Def>, 0: T }[TupleHasIndex<R, I>];

export type MergeAllFn<R extends List<Obj<any>>, I extends number = 0, T = {}> =
  { 1: MergeAllFn<R, Inc[I], Overwrite<T, R[I]>>, 0: T }[TupleHasIndex<R, I>];

export type FromPairsFn<R extends List<[string|number, any]>, I extends number = 0, T = {}> =
  { 1: FromPairsFn<R, Inc[I], Overwrite<T, { [P in R[I][0]]: R[I][1] }>>, 0: T }[TupleHasIndex<R, I>];

export type ZipObjectFn<R extends List<string>, R2 extends List<any>, I extends number = 0, T = {}> =
  { 1: ZipObjectFn<R, R2, Inc[I], Overwrite<T, { [P in R[I]]: R2[I] }>>, 0: T }[TupleHasIndex<R, I>];

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
