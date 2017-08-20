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

// failed attempt at widening literals; `&` actually leaves them intact
// export type Widen<T> = T & (undefined | null | boolean | number | string | {} | void | never);
