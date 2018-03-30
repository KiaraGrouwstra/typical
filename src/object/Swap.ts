import { Obj } from '../util/Obj';

/**
 * Swap the keys and values of an object type with string literals as values.
 */
export type Swap<
    T extends Obj<string>,
    Keys extends keyof T = keyof T,
    Vals extends string = T[Keys]
> = {[P1 in Vals]: {[P2 in Keys]: P1 extends T[P2] ? P2 : never }[Keys]};
