import { Bool } from '../util/Bool';
import { Obj } from '../util/Obj';

/**
 * Logical `AND`, `&&` equivalent for string bools.
 */
export type And<
  A extends Bool,
  B extends Bool
> = ({ 1: { 1: '1' } & Obj<'0'> } & Obj<Obj<'0'>>)[A][B];
