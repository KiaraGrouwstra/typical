/**
 * Widen a type and all its (sub) properties.
 */
export type DeepWiden<T> =
    T extends any[] ? DeepWidenArray<T[number]> :
    T extends object ? DeepWidenObject<T> :
    Widen<T>;
interface DeepWidenArray<T> extends Array<DeepWiden<T>> {}
type DeepWidenObject<T> = {
    [P in keyof T]: DeepWiden<T[P]>;
};
