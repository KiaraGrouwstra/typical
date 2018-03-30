/**
 * Creates a function that is bound to a context.
 * @see http://ramdajs.com/docs/#bind
 */
// // bind, needs #5453:
// interface Function {
//     bind<
//         F extends (this: T, ...args: ArgsAsked) => R,
//         ArgsAsked extends any[],
//         R extends any,
//         T,
//         Args extends any[], // tie to ArgsAsked
//         Left extends any[] = DifferenceTuples<ArgsAsked, Args>,
//         EnsureArgsMatchAsked extends 0 = ((v: Args) => 0)(TupleFrom<ArgsAsked, TupleLength<Args>>)
//         // ^ workaround to ensure we can tie `Args` to both the actual input params as well as to the desired params. it'd throw if the condition is not met.
//     >(
//         this: F,
//         thisObject: T,
//         ...args: Args
//     ): (this: any, ...rest: Left) => R;
//     // ^ `R` alt. to calc return type based on input (needs #6606): `F(this: T, ...[...Args, ...Left])`
// }
