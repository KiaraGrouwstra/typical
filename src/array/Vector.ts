import { Inc } from '../number/Inc';
import { NumberToString } from '../cast/NumberToString';
import { NumbersEqual } from '../comp/NumbersEqual';

/**
 * Create a homogeneous tuple for a given type and size
 * @param T element type
 * @param N vector size
 * @returns a tuple type
 */
export type Vector<
    T,
    N extends number,
    I extends number = 0,
    Acc = { length: N }
> = {
    1: Acc,
    0: Vector<T, N, Inc[I], Acc & { [P in NumberToString[I]]: T }>
}[NumbersEqual<I, N>];
