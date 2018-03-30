import { Keyed } from './Keyed';
import { Obj } from '../util/Obj';

/**
 * Use an object type to make an object type using its keys as both keys and values.
 * Additionally has a string index of `never` to allow safe property access.
 */
export type KeyedSafe<T> = Keyed<T> & Obj<never>;
