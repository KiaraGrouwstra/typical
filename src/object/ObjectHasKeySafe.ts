import { UnionsOverlap } from '../union/UnionsOverlap';

/**
 * Check if an object type has a certain key.
 * Will not look for prototype methods for keys like `toString`.
 */
export type ObjectHasKeySafe<O extends object, K extends string> = UnionsOverlap<keyof O, K>;
