/**
 * Strip null/undefined from a type and all its (sub) properties.
 */
export type DeepAssert<T> =
    T extends any[] ? DeepAssertArray<T[number]> :
    T extends object ? DeepAssertObject<T> :
    NonNullable<T>;
interface DeepAssertArray<T> extends Array<DeepAssert<T>> {}
type DeepAssertObject<T> = {
    [P in keyof T]: DeepAssert<T[P]>;
};
