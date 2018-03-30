import { Dec } from '../number/Dec';
import { Matches } from '../type/Matches';

/**
 * Type-level `<`.
 */
export type Lt<
  A extends number,
  B extends number
> = {
  1: '0',
  0: A extends 0 ? '1' : Lt<Dec[A], Dec[B]>,
}[Matches<B, 0>];
