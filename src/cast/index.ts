export { BoolToString } from './BoolToString';
export { ListToNumObj } from './ListToNumObj';
export { NumberToNumber } from './NumberToNumber';
export { NumberToString } from './NumberToString';
export { NumObjToList } from './NumObjToList';
export { StringToNumber } from './StringToNumber';
export { ToBool } from './ToBool';
export { TupleIndicesToUnion } from './TupleIndicesToUnion';
export { TupleToList } from './TupleToList';
export { TupleToObject } from './TupleToObject';
export { TupleToUnion } from './TupleToUnion';

/**
 * Type functions used to convert between types of different kinds.
 */

// UnionToArray: could be done given e.g. union iteration.
// ObjectToArray: could be useful if converting tuples types to number-indexed object types, do further operations, then convert back. likely needs object iteration.
