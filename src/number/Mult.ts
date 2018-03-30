import { Dec } from './Dec';
import { Add } from './Add';
import { Matches } from '../type/Matches';

/**
 * Multiply two numbers.
 */
export type Mult<
  A extends number,
  B extends number,
  Acc extends number = 0
> = { 1: Acc, 0: Mult<A, Dec[B], Add<Acc, A>> }[Matches<B, 0>];
