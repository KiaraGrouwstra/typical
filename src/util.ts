/**
 * General utilities that seemed not to fit in the other modules.
 * @preferred
 */

/**
 * A shorthand to make homogeneous object types.
 */
export type Obj<T> = { [k: string]: T };

/**
 * A shorthand to make numerically indexed object types.
 */
export type NumObj<T> = { [k: number]: T };

/**
 * shorter `ArrayLike` alias
 */
export type List<T> = ArrayLike<T>;

/**
 * A string-based boolean analog. Used in type-level conditionals,
 * especially as a way to simultaneously enable recursion.
 */
export type Bool = '0'|'1';

/**
 * Type-level equivalent of ternary operator `a ? b : c`.
 * Seems good for recursion, but a type can't reference itself in the top layer.
 */
export type If<Cond extends Bool, Then, Else> = { 1: Then, 0: Else }[Cond];

/**
 * inspired by Idris language, an operator to asssert a type
 */
export type The<T, V extends T> = V;

/**
 * function version of `The`, useful to test types at compile time
 */
export declare function the<T, V extends T>(): '1';

/**
 * just make an intersection type -- this wrapper helps to beat error
 * `Type ... does not satisfy the constraint ...`
 */
export type Intersection<A, B> = A & B;

/**
 * The type of all values; nothing is known about it a priori
 * except that it exists. The same idea as Flow's `mixed` type.
 * Borrowed from @pelotom's `type-zoo`
 *
 * @see https://github.com/pelotom/type-zoo/#unknown
 * @see https://github.com/Microsoft/TypeScript/issues/10715
 */
export type unknown = {} | undefined | null;

/**
 * Use to prevent a usage of type `T` from being inferred in other generics.
 * Borrowed from @pelotom's `type-zoo`
 *
 * Example:
 * `declare function assertEqual<T>(actual: T, expected: NoInfer<T>): boolean;`
 *
 * Type `T` will now only be inferred based on the type of the `actual` param, and
 * the `expected` param is required to be assignable to the type of `actual`.
 * This allows you to give one particular usage of type `T` full control over how the
 * compiler infers type `T`.
 *
 * @see https://github.com/pelotom/type-zoo/#noinfert
 * @see https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-322267089
 */
export type NoInfer<T> = T & { [K in keyof T]: T[K] };
