import { Obj } from '../util/Obj';

/**
 * Check if a union contains a given string literal.
 * Deprecated, ditch for `Matches`.
 * @deprecated
 */
export type UnionHasKey<Union extends string, K extends string> = ({[S in Union]: '1' } & Obj<'0'>)[K];
