import { List } from '../util/List';

/**
 * Checks whether a tuple-like type has a (numerical) index
 * @param Arr tuple-like type
 * @param I the index to check
 * @returns a string bool
 */
export type TupleHasIndex<
  Arr extends List<any>,
  I extends number
> = ({[K in keyof Arr]: '1' } & Array<'0'>)[I];
