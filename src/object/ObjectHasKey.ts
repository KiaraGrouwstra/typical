import { UnionHasKey } from '../union/UnionHasKey';

/**
 * Check if an object type has a certain key.
 * Returns prototype methods for keys like `toString`.
 */
export type ObjectHasKey<
  O extends {},
  K extends string
> = UnionHasKey<keyof O, K>;
// > = Matches<K, keyof O>;
