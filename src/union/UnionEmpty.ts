import { And } from '../boolean/And';
import { UnionContained } from './UnionContained';

/**
 * Check if a union is empty, that is, if a type is `never`.
 */
export type UnionEmpty<T extends string> =　And<UnionContained<T, 'foo'>, UnionContained<T, 'bar'>>;
