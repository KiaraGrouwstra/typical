import { And, Not } from './boolean';

// obtain the disjoint union of two types, yielding never for types satisfying neither/both
export type Xor<T, A, B> = T extends A ? (T extends B ? never : T) : (T extends B ? T : never);

// check a type (<=)
export type Matches<V, T> = V extends T ? '1' : '0';
// check a type (=)
export type TypesEqual<A, B> = And<Matches<A, B>, Matches<B, A>>;
// check a type (<)
export type InstanceOf<V, T> = And<Matches<V, T>, Not<Matches<T, V>>>;

// return the first of two types
export type Const<A, B> = A;

// unwrap a Promise to obtain its return value
export type Awaited<T> = {
  '1': T extends { then(onfulfilled: (value: infer U) => any): any; } ? Awaited<U> : T;
}[T extends number ? '1' : '1'];

// flatten a structure of nested tuples/arrays into a flat array type
export type Flatten<T> = {
  '1': Flatten<T extends Array<infer U> ? U : T>;
}[T extends number ? '1' : '1'];

// widen scalar types from literals to their parent types
export type Widen<T> =
  T extends boolean ? boolean :
  T extends number ? number :
  T extends string ? string :
  T;

export type DiscriminateUnion<Union, TagKey extends keyof Union, TagValue extends Union[TagKey]> =
  Union extends Record<TagKey, TagValue> ? Union : never;

// export type PrototypeOf<V, T> = ...
// ^ get the prototype (-> methods) of a type. `Partial` helps for e.g. tuple types if not object types, though `Symbol`-based keys get killed.

// export type Lambda<K> = any;
// export type TypeMap<F extends Lambda, Keys extends string> = Pick<F, Keys>[Keys];
// // nope, no type lambdas -- can't have unapplied types
