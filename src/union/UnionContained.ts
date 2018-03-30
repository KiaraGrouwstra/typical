import { Obj } from '../util/Obj';
import { DefinitelyYes } from '../boolean/DefinitelyYes';

/**
 * Check if a union is wholly contained in another one.
 * Deprecated, ditch for `Matches`.
 * @deprecated
 */
export type UnionContained<T extends string, U extends string> = DefinitelyYes<({ [P in U]: '1' } & Obj<'0'>)[T | U]>;
