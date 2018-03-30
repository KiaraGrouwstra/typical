import { List } from '../util/List';
import { Inc } from '../number/Inc';
import { Dec } from '../number/Dec';
import { TupleHasIndex } from './TupleHasIndex';

/**
 * Get the last used index for a tuple-like type, assuming no gaps
 */
// export type TupleLastIndex<R extends {}> = Dec[Length<R>];
export type TupleLastIndex<R extends List<any>, I extends number = 0> =
  { 1: TupleLastIndex<R, Inc[I]>, 0: Dec[I] }[TupleHasIndex<R, I>];
