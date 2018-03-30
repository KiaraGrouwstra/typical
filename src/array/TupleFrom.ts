// `...` needs #5453, so syntax errors:
// /** From a tuple-like type, get the subset starting from a certain index. Returns a tuple type. */
// export type TupleFrom<T extends List<any>, I extends number, Acc extends List<any> = []> =
//   { 0: Acc, 1: TupleFrom<T, Inc[I], [...Acc, T[I]]> }[TupleHasIndex<T, I>];
// the<['c', 'd'], TupleFrom<['a', 'b', 'c', 'd'], 2>>();
