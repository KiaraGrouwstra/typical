import { Bool } from '../util/Bool';
import { And } from './And';
import { Determinate } from './Determinate';

/**
 * Checks whether a string bool has `'1'`, yet not `'0'`.
 */
export type DefinitelyYes<T extends Bool> = And<T, Determinate<T>>;
