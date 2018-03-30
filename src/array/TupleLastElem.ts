import { List } from '../util/List';
import { Inc } from '../number/Inc';
import { Dec } from '../number/Dec';
import { TupleHasIndex } from './TupleHasIndex';

/**
 * Get the last element of a tuple-like type
 */
export type TupleLastElem<R extends List<any>, I extends number = 0> =
  { 1: TupleLastElem<R, Inc[I]>, 0: R[Dec[I]] }[TupleHasIndex<R, I>];
