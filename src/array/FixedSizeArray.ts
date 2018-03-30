/**
 * we use numeric literal types for length as TS 2.7 does for fixed size tuples
 * @param N the length of the array
 * @param T the type of array elements
 * @param M a dummy type inizialized to '0', we need it to trick the compiler
 * @see https://github.com/mstn/fixed-size-array/
 */
export type FixedSizeArray<N extends number, T> =
    { 0: any, length: N } & ReadonlyArray<T>;
