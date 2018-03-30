/**
 * Common properties from L and R with undefined in R[K] replaced by type in L[K]
 */
export type SpreadProps<L, R, K extends keyof L & keyof R> =
    { [P in K]: L[P] | Exclude<R[P], undefined> };
