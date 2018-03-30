import { StringToNumber } from '../cast/StringToNumber';

/**
 * Get the nth argument of a function.
 */
export type Argument<
    N extends StringToNumber[keyof FnShape<any>],
    T extends FnShape<any>[N]
> = T extends FnShape<infer R>[N] ? R: T;

interface FnShape<N extends number> {
    0: (a0: N, ...args: any[]) => any;
    1: (a0: any, a1: N, ...args: any[]) => any;
    2: (a0: any, a1: any, a2: N, ...args: any[]) => any;
    3: (a0: any, a1: any, a2: any, a3: N, ...args: any[]) => any;
    4: (a0: any, a1: any, a2: any, a3: any, a4: N, ...args: any[]) => any;
    5: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: N, ...args: any[]) => any;
    6: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: N, ...args: any[]) => any;
    7: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: N, ...args: any[]) => any;
    8: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: N, ...args: any[]) => any;
    9: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: N, ...args: any[]) => any;
    10: (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any, a10: N, ...args: any[]) => any;
    [i: number]: (...args: any[]) => any;
}
