/**
 * Check the number of arguments on a function.
 * @see https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-374191157
 */
export type NumberOfArgs<T extends Function> = 
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H, i: infer I, j: infer J) => any ? (
        IsValidArg<J> extends true ? 10 :
        IsValidArg<I> extends true ? 9 :
        IsValidArg<H> extends true ? 8 :
        IsValidArg<G> extends true ? 7 :
        IsValidArg<F> extends true ? 6 :
        IsValidArg<E> extends true ? 5 :
        IsValidArg<D> extends true ? 4 :
        IsValidArg<C> extends true ? 3 :
        IsValidArg<B> extends true ? 2 :
        IsValidArg<A> extends true ? 1 : 0
    ) : 0;

