import { The } from '../util/The';
import { Length } from '../array/Length';

/**
 * Create a function from a tuple of parameter types and a return type.
 */
export type Fn<A extends any[], R=void> = {
    0: ()=>R;
    1: (a0:A[0]) => R;
    2: (a0:A[0], a1:A[1]) => R;
    3: (a0:A[0], a1:A[1], a2:A[2]) => R;
    4: (a0:A[0], a1:A[1], a2:A[2], a3:A[3]) => R;
    5: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4]) => R;
    6: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5]) => R;
    7: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6]) => R;
    8: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7]) => R;
    9: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7], a8:A[8]) => R;
    10: (a0:A[0], a1:A[1], a2:A[2], a3:A[3], a4:A[4], a5:A[5], a6:A[6], a7:A[7], a8:A[8], a9:A[9]) => R;
    [i: number]: (...args: any[]) => R;
}[The<number, Length<A>>];
