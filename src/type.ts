import { the } from './util';
// import { And, Not } from './boolean';

// // throwing Matches
// let f = <T>(v: T) => true;

export interface isT<T> {
  (v: T): '1';
  (v: any): '0';
}

// export type Matches<V, T> = typeof isT<T>(V);
// // ^ this is where things fail until #6606
// let isBool: isT<boolean>
// let falseBool = isBool(false) // 1
// let trueBool = isBool(true) // 1
// let anyBool = isBool(<any> 0) // 0
// let neverBool = isBool(<never> 0) // 1...
// // ^ `never` qualifies as anything... may need to rethink this.

// export type Equal<A, B> = And<Matches<A, B>, Matches<B, A>>;
// export type InstanceOf<V, T> = And<Matches<V, T>, Not<Matches<T, V>>>;

// export type Lambda<K> = any;
// export type TypeMap<F extends Lambda, Keys extends string> = Pick<F, Keys>[Keys];
// // nope, no type lambdas -- can't have unapplied types
