import { And } from '../boolean/And';
import { Matches } from './Matches';

/**
 * Check if two types are equal (`==`), i.e. match both ways.
 */
export type TypesEqual<A, B> = And<Matches<A, B>, Matches<B, A>>;
