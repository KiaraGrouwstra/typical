// // robust alternative that takes into account return values dependent on input params, needs #5453 + #6606
// function curry<F>(fn: F): Curried<F>;
// type Curried<
//   F extends (...args: ArgsAsked) => any,
//   ArgsAsked extends any[] = ArgsAsked,
//   ArgsPrevious = []
// > = <
//   ArgsGiven extends any[] = ArgsGiven,
//   ArgsAll extends [...ArgsPrevious, ...ArgsGiven]
//       = [...ArgsPrevious, ...ArgsGiven]
//   >(...args: ArgsGiven) =>
//     If<
//       TupleHasIndex<ArgsAll, TupleLastIndex<ArgsAsked>>,
//       F(...[...ArgsPrevious, ...ArgsGiven]),　// #6606
//       Curried<ArgsAsked, Ret, ArgsAll>
//     >;
