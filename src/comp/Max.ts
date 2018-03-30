import { Gt } from './Gt';
import { If } from '../util/If';

/**
 * Get the highest of two number literals.
 */
export type Max<
  A extends number,
  B extends number
> = If<Gt<A, B>, A, B>;
