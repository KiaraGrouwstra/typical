import { The } from './util';
import { Length } from './array';

export type Fn<A extends any[], R=void> = {
    0: ()=>R
    1: (a0:A[0]) => R
    2: (a0:A[0], a1:A[1]) => R
    3: (a0:A[0], a1:A[1], a2:A[2]) => R
    4: (a0:A[0], a1:A[1], a2:A[2], a3:A[3]) => R
    5: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4]) => R
    6: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5]) => R
    7: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6]) => R
    8: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7]) => R
    9: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7], a8:A[8]) => R
    10: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7], a8:A[8], a9:A[9]) => R
}[The<number, Length<A>>];
// `ObjectHasKey` and by extension `TupleLength` suffer from #17456

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
// `function div<B extends number, NotZero = { (v: '1') => 'whatever'; }({ (v: 0) => '0'; (v: number) => '1'; }(B))>(a: number, b: B)`
