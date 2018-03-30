import { Dec } from '../number/Dec';
import { Matches } from '../type/Matches';

/**
 * Type-level `<=`.
 */
export type Lte<
  A extends number,
  B extends number
> = {
  1: '1',
  0: B extends 0 ? '0' : Lte<Dec[A], Dec[B]>,
}[Matches<A, 0>];
