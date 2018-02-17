import { And, Not } from './boolean';

/**
 * Type functions related to types and type checks in general.
 * @preferred
 */

/**
 * Get the disjoint union of two types, yielding `never` for types satisfying neither/both.
 * @see https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-360862303
 */
export type Xor<T, A, B> = T extends A ? (T extends B ? never : T) : (T extends B ? T : never);

/**
 * Check if a type matches another (`<=`).
 */
export type Matches<V, T> = V extends T ? '1' : '0';

/**
 * Check if two types are equal (`==`), i.e. match both ways.
 */
export type TypesEqual<A, B> = And<Matches<A, B>, Matches<B, A>>;

/**
 * Check if a type is an instance of another, that is, matches it but is not equal (`<`).
 */
export type InstanceOf<V, T> = And<Matches<V, T>, Not<Matches<T, V>>>;

/**
 * The identity type. Probably not useful until unapplied types become a thing.
 */
export type Id<T> = T;

/**
 * Return the first of two types, aka the kestrel combinator.
 * @see https://hackage.haskell.org/package/data-aviary-0.4.0/docs/Data-Aviary-Birds.html
 */
export type Const<A, B> = A;

/**
 * Unwrap a `Promise` to obtain its return value.
 * @see https://github.com/Microsoft/TypeScript/pull/21613
 */
export type Awaited<T> = {
  '1': T extends { then(onfulfilled: (value: infer U) => any): any; } ? Awaited<U> : T;
}[T extends number ? '1' : '1'];

/**
 * Flatten a structure of nested tuples/arrays into a flat element type.
 */
export type Flatten<T> = {
  '1': Flatten<T extends Array<infer U> ? U : T>;
}[T extends number ? '1' : '1'];

/**
 * Widen scalar types from literals to their parent types.
 */
export type Widen<T> =
  T extends boolean ? boolean :
  T extends number ? number :
  T extends string ? string :
  T;

/**
 * Get the constituent of a tagged union given the value of the discriminant.
 * @see https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-364982638
 */
export type DiscriminateUnion<
  Union,
  TagKey extends keyof Union,
  TagValue extends Union[TagKey]
> = Union extends Record<TagKey, TagValue> ? Union : never;

/**
 * Get the prototype (-> methods) of a type.
 * `Partial` helps for e.g. tuple types if not object types,
 * though `Symbol`-based keys get killed.
 */
// export type PrototypeOf<V, T> = ...

// export type Lambda<K> = any;
// export type TypeMap<F extends Lambda, Keys extends string> = Pick<F, Keys>[Keys];
// // nope, no type lambdas -- can't have unapplied types
