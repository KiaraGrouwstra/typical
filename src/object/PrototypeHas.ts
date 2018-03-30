import { ObjectHasKey } from './ObjectHasKey';
import { Prototype } from './Prototype';

/**
 * Check if a key is among those used to access prototype methods on object types.
 */
export type PrototypeHas<K extends string> = ObjectHasKey<Prototype, K>;
