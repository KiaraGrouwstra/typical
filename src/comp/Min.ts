import { Lt } from './Lt';
import { If } from '../util/If';

/**
 * Get the lowest of two number literals.
 */
export type Min<
  A extends number,
  B extends number
> = If<Lt<A, B>, A, B>;
