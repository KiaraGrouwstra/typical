import { List } from '../util/List';
import { IncIndex } from './IncIndex';
/**
 * Prepend an element to a tuple-like type, returning a numerical object.
 * Presumes the list is already zero-indexed, otherwise needs `ZeroIndex`.
 */
export type Prepend<
  R extends List<any>,
  T
> = { 0: T } & IncIndex<R, 1>;
