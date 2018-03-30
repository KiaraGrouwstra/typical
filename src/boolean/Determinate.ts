import { Bool } from '../util/Bool';
import { Not } from './Not';
import { Indeterminate } from './Determinate';

/**
 * Checks whether a string bool has an terminate result, that is, either `'1'` or `'0'`, but not their union.
 */
export type Determinate<T extends Bool> = Not<Indeterminate<T>>;
