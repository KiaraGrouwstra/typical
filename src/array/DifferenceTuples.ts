// `...` needs #5453, so syntax errors:
// /** Get the subset of a tuple starting from the end of another tuple. */
// export type DifferenceTuples<Big extends List<any>, Small extends List<any>> = TupleFrom<Big, Length<Small>>;
// the<['c', 'd'], DifferenceTuples<['a', 'b', 'c', 'd'], [123, 456]>>();
