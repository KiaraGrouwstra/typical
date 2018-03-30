/**
 * Make a type and all its (sub) properties required.
 */
export type DeepRequired<T> = NonNullable<
    T extends any[] ? DeepRequiredArray<T[number]> :
    T extends object ? DeepRequiredObject<T> :
    T
>;
// interface DeepRequiredArray<T> extends Array<DeepRequired<T>> {}
type DeepRequiredObject<T> = {
    [P in keyof T]+?: DeepRequired<T[P]>;
};
