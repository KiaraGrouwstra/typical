import { UnionHasKey } from '../union/UnionHasKey';

/**
 * Check whether two string literal types are equivalent.
 * @deprecated ditch for Matches
*/
export type StringsEqual<
  A extends string,
  B extends string
> = UnionHasKey<A, B>;
