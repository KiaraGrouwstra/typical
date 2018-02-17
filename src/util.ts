export type Obj<T> = { [k: string]: T };
export type NumObj<T> = { [k: number]: T };
// export type List = ArrayLike; // no unapplied generic types :(
export type List<T> = ArrayLike<T>;
export type Bool = '0'|'1';

export type If<Cond extends Bool, Then, Else> = { 1: Then, 0: Else }[Cond];
// ^ seems great for recursion, but can't have a type reference itself in the top layer

// inspired by Idris language, an operator to asssert a type
export type The<T, V extends T> = V;

// function version, useful to test types at compile time
export declare function the<T, V extends T>(): '1';

// just make an intersection type -- this wrapper helps to beat error `Type ... does not satisfy the constraint ...`
export type Intersection<A, B> = A & B;

/**
 * The type of all values; nothing is known about it a priori
 * except that it exists. The same idea as Flow's `mixed` type.
 * Borrowed from @pelotom's type-zoo
 *
 * @see https://github.com/Microsoft/TypeScript/issues/10715
 */
export type unknown = {} | undefined | null;

/**
 * Use to prevent a usage of type `T` from being inferred in other generics.
 *
 * Example:
 * declare function assertEqual<T>(actual: T, expected: NoInfer<T>): boolean;
 *
 * Type `T` will now only be inferred based on the type of the `actual` param, and
 * the `expected` param is required to be assignable to the type of `actual`.
 * This allows you to give one particular usage of type `T` full control over how the
 * compiler infers type `T`.
 * Borrowed from @pelotom's type-zoo
 *
 * @see https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-322267089
 */
export type NoInfer<T> = T & { [K in keyof T]: T[K] };
