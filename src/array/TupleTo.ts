// `...` needs #5453, so syntax errors:
// /** From a tuple-like type, get the subset up to a certain index. Returns a tuple type. */
// export type TupleTo<T extends List<any>, To extends number, I extends number = 0, Acc extends List<any>=[]> =
//   If<TupleHasIndex<T, I>, { 0: Acc; 1: TupleTo<T, To, Inc[I], [...Acc, T[I]]>; }[Matches<To, I>], T>;
// the<['a', 'b'], TupleTo<['a', 'b', 'c', 'd'], 2>>();
