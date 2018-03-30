import { List } from '../util/List';
import { Spread } from '../object/Spread';
import { Add } from '../number/Add';
import { IncIndex } from './IncIndex';

/**
 * Append two numerically indexed types with explicit `length`, e.g. tuple types. Returns a numerical object type.
 */
export type ConcatLists<A extends List<any>, B extends List<any>> = 
  Spread<A & IncIndex<B, A['length']>, { length: Add<A['length'], B['length']> }>;
