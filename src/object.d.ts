import { If, Obj, The, Intersection } from './util';
import { UnionHasKey, UnionsOverlap, Diff } from './union';
import { TupleHasIndex, IsArrayType } from './array';
import { NumberToString, StringToNumber } from './cast';

type PrototypeMethods = 'toLocaleString' | 'toString' //| 'constructor' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'valueOf' | '__defineGetter__' | '__defineSetter__' | '__lookupGetter__' | '__lookupSetter__' | '__proto__';
type Prototype = {[K in PrototypeMethods]: K };
// type PrototypeHas<K extends string> = ObjectHasKey<Prototype, K>;

export type Keyed<T> = {[K in keyof T]: K };

export type KeyedSafe<T> = Keyed<T> & Obj<never>;

export type ObjectHasKey<
  O extends {},
  K extends string
> = UnionHasKey<keyof O, K>;

export type HasKey<T, K extends number|string> = If<
  IsArrayType<T>,
  TupleHasIndex<T & { length: number }, Intersection<number, K>>,
  ObjectHasKey<T, Intersection<string, K>>
>;
// ^ Type 'T' does not satisfy the constraint 'any[]'.
// ^ Type 'K' does not satisfy the constraint 'string'.

export type ObjectHasKeySafe<O extends object, K extends string> = UnionsOverlap<keyof O, K>;

// export type ObjectProp<O extends Obj<any>, K extends string> =
//     O[K]; // trivial, but breaks on `toString` key
export type ObjectProp<O extends Obj<any>, K extends string, Default = never> = If<ObjectHasKeySafe<O, K>, O[K], Default>;
// export type ObjectProp<O extends Obj<any>, K extends string> =
//     If<And<UnionsOverlap<keyof O, 'toString' | 'toLocaleString'>, And<ObjectHasStringIndex<O>, Not<UnionHasKey<keyof T, K>>>>, O[string], O[K]>
// // ^ should prevent 'toString' issues, but ObjectHasStringIndex is not possible today yet though,
// // while the current implementations of UnionHasKey and UnionsOverlap won't suffice as they suffer from the same bug.
// // An alternative based on union iteration could potentially prevent this.

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>; // {[P in Diff<keyof T, K>]: T[P]}

// export type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U;
// ^ no-dependency version by Anders, uses intersection
// export type Overwrite<T, U, Int = { [P in Diff<keyof T, keyof U>]: T[P] } & U> = Pick<Int, keyof Int>;
// ^ my attempt at cleaning out the intersection, somehow makes FromPairs/ZipObject fail
export type Overwrite<
  K extends Obj<any>,
  T extends Obj<any>
> = {[P in keyof T | keyof K]: { 1: T[P], 0: K[P] }[ObjectHasKey<T, P>]};

export type IntersectionObjectKeys<A, B> = Pick<KeyedSafe<B>, keyof A>[keyof A];

export type IntersectionObjects<A, B> = Pick<A, IntersectionObjectKeys<A, B>>;

export type ObjectValsToUnion<O> = O[keyof O];

export interface ObjectHasStringIndex {
  (o: { [k: string]: any }): '1';
  (o: {}): '0';
}
// type ObjectHasStringIndexTestT = ObjectHasStringIndex({ [k: string]: 123 }); // '1'
// type ObjectHasStringIndexTestF = ObjectHasStringIndex({ a: 123 }); // '0'

export type Simplify<T> = Pick<T, keyof T>;

export type Swap<
    T extends Obj<string>,
    Keys extends keyof T = keyof T,
    Vals extends string = T[Keys]
> = {[P1 in Vals]: {[P2 in Keys]: If<UnionHasKey<T[P2], P1>, P2, never> }[Keys]};

// export type ObjectLength = ...
// // check the length (number of keys) of a given heterogeneous object type. doable given `UnionLength` or (object iteration + `Inc`).

// types not possible yet:
// `ObjectHasStringIndex`: accessing it works or throws, checking presence requires `ReturnType` to pattern-match and swallow these errors
// `ObjectHasNumberIndex`: ditto.
// `ObjectNumberKeys`: a `number` variant of `keyof`. could be pulled off given union iteration (`Partial` -> iterate to filter / cast back to number literals)... but still hard to scale past natural numbers.
// `ObjectSymbolKeys`: a `Symbol` variant of `keyof`. no clue how to go about this unless by checking a whitelisted set such as those found in standard library prototype. this feels sorta useless though.
// `ObjectHasElem`: check whether a heterogeneous object type contains a given type among its elements. This could be done given `TypesEq`.
// `FilterObject`: can be done already for fixed conditions; using a predicate function needs `ReturnType`
// `map` over heterogeneous objects: probably just needs `ReturnType`.
// object iteration: useful for e.g. `ObjectToArray`. This could enable union iteration, or the other way around.
// One strategy that comes to mind relies on converting keys to tuple (given UnionToArray) then using array iteration.
