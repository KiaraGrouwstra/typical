import { PrototypeMethods } from './PrototypeMethods';

/**
 * Object of keys used to access prototype methods in object types.
 */
export type Prototype = {[K in PrototypeMethods]: K };
