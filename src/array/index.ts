export { AppendNumObj } from './AppendNumObj';
export { ArrayProp } from './ArrayProp';
export { ArrPrototypeMethods } from './ArrPrototypeMethods';
export { ConcatNumObjs } from './ConcatNumObjs';
export { FixedSizeArray } from './FixedSizeArray';
export { IncIndexNumbObj } from './IncIndexNumbObj';
export { IsArrayType } from './IsArrayType';
export { IsTuple } from './IsTuple';
export { Length } from './Length';
export { ListFrom } from './ListFrom';
export { ListTo } from './ListTo';
export { Reverse } from './Reverse';
export { TupleHasIndex } from './TupleHasIndex';
export { TupleLastElem } from './TupleLastElem';
export { TupleLastIndex } from './TupleLastIndex';
export { TupleProp } from './TupleProp';
export { Vector } from './Vector';

/**
 * Type functions to operate on array-like types.
 * We cannot actually manipulate tuples types yet though (see #5453),
 * so outputs are never tuples -- object types with numerical keys
 * are used instead.
 * 
 * Examples:
 * - `[string, number]` (tuple)
 * - `{ 0: number, 1: string }` (numerically-indexed object)
 * - `{ 0: number, 1: string, length: number }` (-> satisfies
 * `ArrayLike`, numerically-indexed object with `length` property)
 * 
 * @preferred
 */
