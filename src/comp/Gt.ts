import { Dec } from '../number/Dec';
import { Matches } from '../type/Matches';

/**
 * Type-level `>`.
 */
export type Gt<
  A extends number,
  B extends number
> = {
  1: '0',
  0: B extends 0 ? '1' : Gt<Dec[A], Dec[B]>,
}[Matches<A, 0>];
