import { TupleHasIndex } from '../array/TupleHasIndex';
import { Inc } from '../number/Inc';

/**
 * Retrieve the value at a given path.
 * @see http://ramdajs.com/docs/#path
 */
export type PathFn<T extends { [k: string]: any }, R extends Array<string>, I extends number = 0> =
    { 1: PathFn<T[R[I]], R, Inc[I]>, 0: T }[TupleHasIndex<R, I>];
// export declare function path<T extends { [k: string]: any }, R extends Array<string>>(obj: T, path: R): PathFn<T, R>;
