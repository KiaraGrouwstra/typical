import { NonFunctionPropNames } from './NonFunctionPropNames';

/**
 * Mark a type and all its (sub) properties as read-only.
 */
export type DeepReadonly<T> =
    T extends any[] ? DeepReadonlyArray<T[number]> :
    T extends object ? DeepReadonlyObject<T> :
    T;
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
type DeepReadonlyObject<T> = {
    +readonly [P in NonFunctionPropNames<T>]: DeepReadonly<T[P]>;
};
