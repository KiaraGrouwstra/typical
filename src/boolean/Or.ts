import { Bool } from '../util/Bool';
import { Obj } from '../util/Obj';

/**
 * Logical `OR`, `||` equivalent for string bools.
 */
export type Or<
  A extends Bool,
  B extends Bool
> = ({ 0: { 0: '0' } & Obj<'1'> } & Obj<Obj<'1'>>)[A][B];
