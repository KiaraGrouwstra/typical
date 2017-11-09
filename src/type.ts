// import { And, Not } from './boolean';

// // throwing Matches
// let f = <T>(v: T) => true;

export interface isT<T> {
  (v: T): '1';
  (v: any): '0';
}

export interface isT<T> {
  (v: never): '0';
  (v: T): '1';
  (v: any): '0';
}
// export type Matches<V, T> = isT<T>(V);
// type isBool = isT<boolean>;
// let falseBool: isBool(false); // 1
// let trueBool: isBool(true); // 1
// let strBool: isBool(string); // 0
// let anyBool: isBool(any); // 0
// let neverBool: isBool(never); // 0

export type TypesEqual<A, B> = And<Matches<A, B>, Matches<B, A>>;
export type InstanceOf<V, T> = And<Matches<V, T>, Not<Matches<T, V>>>;

// export type PrototypeOf<V, T> = ...
// ^ get the prototype (-> methods) of a type. `Partial` helps for e.g. tuple types if not object types, though `Symbol`-based keys get killed.

// export type Lambda<K> = any;
// export type TypeMap<F extends Lambda, Keys extends string> = Pick<F, Keys>[Keys];
// // nope, no type lambdas -- can't have unapplied types
