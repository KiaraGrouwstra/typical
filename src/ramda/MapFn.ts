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
