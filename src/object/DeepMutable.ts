import { NonFunctionPropNames } from './NonFunctionPropNames';

/**
 * Mark a type and all its (sub) properties as mutable.
 */
export type DeepMutable<T> =
    T extends any[] ? DeepMutableArray<T[number]> :
    T extends object ? DeepMutableObject<T> :
    T;
interface DeepMutableArray<T> extends Array<DeepMutable<T>> {}
type DeepMutableObject<T> = {
    -readonly [P in NonFunctionPropNames<T>]: DeepMutable<T[P]>;
};
