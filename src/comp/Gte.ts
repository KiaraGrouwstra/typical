import { Dec } from '../number/Dec';
import { Matches } from '../type/Matches';

/**
 * Type-level `>=`.
 */
export type Gte<
  A extends number,
  B extends number
> = {
  1: '1',
  0: A extends 0 ? '0' : Gte<Dec[A], Dec[B]>,
}[Matches<B, 0>];
