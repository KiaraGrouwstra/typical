/**
 * Returns a curried equivalent of the provided function.
 * @see http://ramdajs.com/docs/#curry
 */
// // poor man's version, using a given return value rather than using `typeof` based on the given argument types:
// function curry<Args extends any[], Ret>(fn: (...args: Args) => Ret): Curried<Args, Ret>;
// type Curried<
//   ArgsAsked,
//   Ret,
//   ArgsPrevious = [] // if we can't have empty tuple I guess any[] might also destructures to nothing; that might do.
// > = <
//   ArgsGiven extends any[] = ArgsGiven,
//   ArgsAll extends [...ArgsPrevious, ...ArgsGiven]
//       = [...ArgsPrevious, ...ArgsGiven]
//   >(...args: ArgsGiven) =>
//     If<
//       TupleHasIndex<ArgsAll, TupleLastIndex<ArgsAsked>>,
//       Ret,
//       Curried<ArgsAsked, Ret, ArgsAll>
//     >;
