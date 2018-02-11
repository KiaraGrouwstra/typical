// @flow
import { The } from './util';
import { Length } from './array';

export type Fn<A: any[], R=void> = $ElementType<{
    0: ()=>R,
    1: (a0:$ElementType<A, 0>) => R,
    2: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>) => R,
    3: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>, a2:$ElementType<A, 2>) => R,
    4: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>, a2:$ElementType<A, 2>, a3:$ElementType<A, 3>) => R,
    5: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>, a2:$ElementType<A, 2>, a3:$ElementType<A, 3>, a4:$ElementType<A, 4>) => R,
    6: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>, a2:$ElementType<A, 2>, a3:$ElementType<A, 3>, a4:$ElementType<A, 4>, a5:$ElementType<A, 5>) => R,
    7: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>, a2:$ElementType<A, 2>, a3:$ElementType<A, 3>, a4:$ElementType<A, 4>, a5:$ElementType<A, 5>, a6:$ElementType<A, 6>) => R,
    8: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>, a2:$ElementType<A, 2>, a3:$ElementType<A, 3>, a4:$ElementType<A, 4>, a5:$ElementType<A, 5>, a6:$ElementType<A, 6>, a7:$ElementType<A, 7>) => R,
    9: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>, a2:$ElementType<A, 2>, a3:$ElementType<A, 3>, a4:$ElementType<A, 4>, a5:$ElementType<A, 5>, a6:$ElementType<A, 6>, a7:$ElementType<A, 7>, a8:$ElementType<A, 8>) => R,
    10: (a0:$ElementType<A, 0>, a1:$ElementType<A, 1>, a2:$ElementType<A, 2>, a3:$ElementType<A, 3>, a4:$ElementType<A, 4>, a5:$ElementType<A, 5>, a6:$ElementType<A, 6>, a7:$ElementType<A, 7>, a8:$ElementType<A, 8>, a9:$ElementType<A, 9>) => R,
}, The<number, Length<A>>>;

// // unbind: in TS already automatically happens when it should in JS (getting a method without directly applying it).
// export type Unbind<F: (this: This, ...args: Args) => R, This, Args: any[], R> = Fn<[This, ...Args], R>;
// // ^ can't capture params in generic until maybe #5453, error "A rest parameter must be of an array type."
// // ^ #6606 upgrade: don't capture `R`, instead use `F(this: This, ...Args)`
// export type Unbind<F: (this: This, t1: T1) => R, This, R, T1> = Fn<[This, T1], R>;
// export type Unbind<F: (this: This, t1: T1, t2: T2) => R, This, R, T1, T2> = Fn<[This, T1, T2], R>;
// export type Unbind<F: (this: This, t1: T1, t2: T2, t3: T3) => R, This, R, T1, T2, T3> = Fn<[This, T1, T2, T3], R>;
// // ...
// // ^ wait, discriminating generic `F` type probably needs #6606 overloads
// // complication: most stdlib methods don't have the `this` param specified. fix that. wonder why it isn't added implicitly...

// export type Bind<F: (this: This, ...args: Args) => R, This, Args, R, T: This> = Fn<Args, R>;
// // ^ doesn't handle other params yet. `unbind` notes above apply as well.
// // ^ accurate return type over `R`: `F(this: T, ...Args)`.

// todo:
// - `ReturnType`: get the return type of function expressions -- #6606 (dupes: #4233, #6239, #16372)
// - conversion of parameters from/to tuple types: see variadic kinds at #5453
// - function composition -- still issues with generics, see #9366.
// current approach relies on overloads; might be alleviated as part of variadic kinds, see above.
// - currying: see function composition.
// - conditionally throwing 'custom' errors: given `ReturnType`, apply a function with arguments that would not match its requested param types
// - pattern matching: given `ReturnType`, use overloaded type-level function application to emulate pattern matching from other languages.
// - constraints: e.g. divisor of a division function may not be `0`. given pattern matching (above),
// just add an extra generic to said division function using a default with pattern matching to only resolve for non-`0` input, e.g.:
// `function div<B: number, NotZero = $Call<(v: '1') => 'whatever', $Call<{ (v: 0) => '0'; (v: number) => '1'; }, B>>>(a: number, b: B)`
