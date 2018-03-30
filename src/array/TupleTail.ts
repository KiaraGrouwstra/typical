// `...` needs #5453, so syntax errors:
// /** Get a tuple of all but the first element of a tuple-like type. */
// export type TupleTail<R extends List<any>> = TupleFrom<R, 1>;
// the<'c', TupleTail<['a', 'b', 'c']>>();
