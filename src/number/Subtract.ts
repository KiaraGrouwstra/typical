import { Dec } from './Dec';
import { Matches } from '../type/Matches';

/**
 * Subtract two numbers.
 */
export type Subtract<
  A extends number,
  B extends number
> = { 1: A, 0: Subtract<Dec[A], Dec[B]> }[Matches<B, 0>];
