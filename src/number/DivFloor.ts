import { Inc } from './Inc';
import { Gt } from '../comp/Gt';
import { Subtract } from './Subtract';

/**
 * Divide two numbers, returning the floor.
 */
export type DivFloor<
  A extends number,
  B extends number,
  Acc extends number = 0
> = { 0: Acc, 1: DivFloor<Subtract<A, B>, B, Inc[Acc]> }[Gt<A, B>];
