// /** Strip the `this` object off a function, returning a function where the first argument is used as `this`, the others as the remaining arguments. */
// // unbind: in TS already automatically happens when it should in JS (getting a method without directly applying it).
// export type Unbind<F extends (this: This, ...args: Args) => R, This, Args extends any[], R> = Fn<[This, ...Args], R>;
// // ^ can't capture params in generic until maybe #5453, error "A rest parameter must be of an array type."
// // ^ #6606 upgrade: don't capture `R`, instead use `F(this: This, ...Args)`
// export type Unbind<F extends (this: This, t1: T1) => R, This, R, T1> = Fn<[This, T1], R>;
// export type Unbind<F extends (this: This, t1: T1, t2: T2) => R, This, R, T1, T2> = Fn<[This, T1, T2], R>;
// export type Unbind<F extends (this: This, t1: T1, t2: T2, t3: T3) => R, This, R, T1, T2, T3> = Fn<[This, T1, T2, T3], R>;
// // complication: most stdlib methods don't have the `this` param specified. fix that. wonder why it isn't added implicitly...
