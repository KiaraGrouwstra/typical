import { UnionContained } from './UnionContained';

/**
 * Check whether a type is a union (of string literals).
 */
// export type IsUnion<T extends string> = { [P in T]: UnionContained<T, P> }//[T];
export type IsUnion<
T extends string,
O extends { [P in T]: UnionContained<T, P> }
        = { [P in T]: UnionContained<T, P> }
> = O[T];
