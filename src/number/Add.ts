import { Inc } from './Inc';
import { Dec } from './Dec';
import { Matches } from '../type/Matches';

/**
 * Add two numbers.
 */
export type Add<
  A extends number,
  B extends number
> = { 1: A, 0: Add<Inc[A], Dec[B]> }[Matches<B, 0>];
