import { The } from './util';
import { Length } from './array';
import { StringToNumber } from './cast';

/**
 * Type functions operating on function types.
 * @preferred
 */

/**
 * Check if an inferred parameter on a function type exists.
 * @see https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-374191157
 */
export type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;

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

/**
 * Get the nth argument of a function.
 */
export type Argument<
    N extends StringToNumber[keyof FnShape<any>],
    T extends FnShape<any>[N]
> = T extends FnShape<infer R>[N] ? R: T;

interface FnShape<N extends number> {
    0: (a0: N, ...args: any[]) => any;
    1: (a0: any, a1: N, ...args: any[]) => any;
    2: (a0: any, a1: any, a2: N, ...args: any[]) => any;
    3: (a0: any, a1: any, a2: any, a3: N, ...args: any[]) => any;
    4: (a0: any, a1: any, a2: any, a3: any, a4: N, ...args: any[]) => any;
    5: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: N, ...args: any[]) => any;
    6: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: N, ...args: any[]) => any;
    7: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: N, ...args: any[]) => any;
    8: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: N, ...args: any[]) => any;
    9: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: N, ...args: any[]) => any;
    10: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any, a10: N, ...args: any[]) => any;
    [i: number]: (...args: any[]) => any;
}

/**
 * Create a function from a tuple of parameter types and a return type.
 */
export type Fn<A extends any[], R=void> = {
    0: ()=>R;
    1: (a0:A[0]) => R;
    2: (a0:A[0], a1:A[1]) => R;
    3: (a0:A[0], a1:A[1], a2:A[2]) => R;
    4: (a0:A[0], a1:A[1], a2:A[2], a3:A[3]) => R;
    5: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4]) => R;
    6: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5]) => R;
    7: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6]) => R;
    8: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7]) => R;
    9: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7], a8:A[8]) => R;
    10: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7], a8:A[8], a9:A[9]) => R;
    [i: number]: (...args: any[]) => R;
}[The<number, Length<A>>];

/**
 * Get the parameter types of a function.
 */
export type Arguments<T extends (...args: any[]) => any> =
    T extends () => any ? never[] :
    T extends (a: infer A) => any ? [A] :
    T extends (a: infer A, b: infer B) => any ? [A, B] :
    T extends (a: infer A, b: infer B, c: infer C) => any ? [A, B, C] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D) => any ? [A, B, C, D] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E) => any ? [A, B, C, D, E] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F) => any ? [A, B, C, D, E, F] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G) => any ? [A, B, C, D, E, F, G] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H) => any ? [A, B, C, D, E, F, G, H] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H, i: infer I) => any ? [A, B, C, D, E, F, G, H, I] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H, i: infer I, j: infer J) => any ? [A, B, C, D, E, F, G, H, I, J] :
    never[];

// /** Strip the `this` object off a function, returning a function where the first argument is used as `this`, the others as the remaining arguments. */
// // unbind: in TS already automatically happens when it should in JS (getting a method without directly applying it).
// export type Unbind<F extends (this: This, ...args: Args) => R, This, Args extends any[], R> = Fn<[This, ...Args], R>;
// // ^ can't capture params in generic until maybe #5453, error "A rest parameter must be of an array type."
// // ^ #6606 upgrade: don't capture `R`, instead use `F(this: This, ...Args)`
// export type Unbind<F extends (this: This, t1: T1) => R, This, R, T1> = Fn<[This, T1], R>;
// export type Unbind<F extends (this: This, t1: T1, t2: T2) => R, This, R, T1, T2> = Fn<[This, T1, T2], R>;
// export type Unbind<F extends (this: This, t1: T1, t2: T2, t3: T3) => R, This, R, T1, T2, T3> = Fn<[This, T1, T2, T3], R>;
// // complication: most stdlib methods don't have the `this` param specified. fix that. wonder why it isn't added implicitly...

// /** Bind a type to a function's `this` object. */
// export type Bind<F extends (this: This, ...args: Args) => R, This, Args, R, T extends This> = Fn<Args, R>;
// // ^ doesn't handle other params yet. `unbind` notes above apply as well. only useful after #6606.
// // ^ accurate return type over `R`: `F(this: T, ...Args)`.

// todo:
// - `ReturnType`: get the return type of function expressions for given parameter types -- #6606 (dupes: #4233, #6239, #16372)
// - conversion of parameters from/to tuple types: see variadic kinds at #5453
// - currying, parameter-sensitive function composition, needs #5453
// - conditionally throwing 'custom' errors: given `ReturnType`, apply a function with arguments that would not match its requested param types
// - constraints: e.g. divisor of a division function may not be `0`. extra generic to only resolve for good input, e.g.:
// `function div<B extends number, NotZero = { (v: '1') => 'whatever'; }({ (v: 0) => '0'; (v: number) => '1'; }(B))>(a: number, b: B)`
