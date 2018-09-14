import { UnionContained } from './UnionContained';

/**
 * Check whether a type is a union (of string literals).
 */
export type IsUnion<T, Y=true, N=false> =
    [T] extends [infer U] ?
        U extends any ?
            [T] extends [U] ? N : Y
            : never
        : never;
