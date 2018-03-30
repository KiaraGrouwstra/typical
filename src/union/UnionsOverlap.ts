import { Not } from '../boolean/Not';
import { UnionEmpty } from '../union/UnionEmpty';

/**
 * Check if there is any overlap between two unions of string literals.
 */
export type UnionsOverlap<Big extends string, Small extends string> = Not<UnionEmpty<Extract<Big, Small>>>;
