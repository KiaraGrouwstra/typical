// /** Bind a type to a function's `this` object. */
// export type Bind<F extends (this: This, ...args: Args) => R, This, Args, R, T extends This> = Fn<Args, R>;
// // ^ doesn't handle other params yet. `unbind` notes above apply as well. only useful after #6606.
// // ^ accurate return type over `R`: `F(this: T, ...Args)`.
