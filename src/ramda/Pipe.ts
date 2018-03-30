/**
 * Performs left-to-right function composition.
 * @see http://ramdajs.com/docs/#pipe
 */
// type Pipe<Fs extends List<(...args: any[]) => any>, F = Fs[0], Args = Arguments<F>> = Fn<Args, ApplyFns<ListFrom<Fs, 1>, F(...Args)>>;
// // ^ todo: use generics so as to plug in not the static `Args` but base return value on the actual input types
