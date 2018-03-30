import { Obj } from '../util/Obj';
import { ObjectHasKey } from '../object/ObjectHasKey';

/**
 * Merge second object into the first.
 * Deprecated, switch to Spread.
 * @deprecated
 */
// export type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
// ^ no-dependency version by Anders, works fine but uses intersection, yielding verbose types
// export type Overwrite<T, U, Int = { [P in Exclude<keyof T, keyof U>]: T[P] } & U> = Pick<Int, keyof Int>;
// ^ my attempt at cleaning out the intersection, somehow makes AppendList/FromPairs/ZipObject fail
export type Overwrite<
  K extends Obj<any>,
  T extends Obj<any>
> = {[P in keyof T | keyof K]: { 1: T[P], 0: K[P] }[ObjectHasKey<T, P>]};
