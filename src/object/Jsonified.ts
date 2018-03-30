/**
 * Calculate the type after converting to JSON and back.
 * @see https://github.com/Microsoft/TypeScript/issues/21838
 */
export type Jsonified<T> =
    T extends string | number | boolean | null ? T
    : T extends undefined | Function ? undefined
    : T extends { toJSON(): infer R } ? R
    : T extends object ? JsonifiedObject<T>
    : "wat";
type JsonifiedObject<T extends object> = { [K in keyof T]: Jsonified<T[K]> };
