// @flow
import type { If, Obj, The, Intersection } from './util';
import type { And, Not } from './boolean';
import type { UnionHasKey, UnionsOverlap } from './union';
import type { TupleHasIndex, IsArrayType } from './array';
import type { NumberToString, StringToNumber } from './cast';

type PrototypeMethods = 'toLocaleString' | 'toString' //| 'constructor' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'valueOf' | '__defineGetter__' | '__defineSetter__' | '__lookupGetter__' | '__lookupSetter__' | '__proto__';
type Prototype = {[K in PrototypeMethods]: K };
// type PrototypeHas<K: string> = ObjectHasKey<Prototype, K>;

export type Keyed<T> = $ObjectMap<T, () => K>;

export type KeyedSafe<T> = Keyed<T> & Obj<empty>;

export type ObjectHasKey<
  O: {},
  K: string
> = UnionHasKey<$Keys<O>, K>;

export type HasKey<T, K: number|string> = If<
  IsArrayType<T>,
  TupleHasIndex<T & { length: number }, Intersection<number, K>>,
  ObjectHasKey<T, Intersection<string, K>>
>;

export type ObjectHasKeySafe<O: object, K: string> = UnionsOverlap<$Keys<O>, K>;

// export type ObjectProp<O: Obj<any>, K: string, Default = empty> = If<ObjectHasKeySafe<O, K>, O[K], Default>;
export type ObjectProp<O: Obj<any>, K: string> =
    If<And<UnionsOverlap<$Keys<O>, 'toString' | 'toLocaleString'>, And<ObjectHasStringIndex<O>, Not<UnionHasKey<$Keys<O>, K>>>>, $ElementType<O, string>, $ElementType<O, K>>
// ^ should prevent 'toString' issues of O[K], but the current implementations of
// UnionHasKey and UnionsOverlap won't suffice as they suffer from the same bug.
// An alternative based on union iteration could potentially prevent this.

export type Omit<T, K: $Keys<T>> = Pick<T, $Diff<$Keys<T>, K>>;

// export type Overwrite<T, U> = { [P in $Diff<$Keys<T>, $Keys<U>>]: $ElementType<T, P> } & U;
// ^ no-dependency version by Anders, works fine but uses intersection, yielding verbose types
// export type Overwrite<T, U, Int = { [P in $Diff<$Keys<T>, $Keys<U>>]: $ElementType<T, P> } & U> = Pick<Int, $Keys<Int>>;
// ^ my attempt at cleaning out the intersection, somehow makes AppendList/FromPairs/ZipObject fail
export type Overwrite<
  K: Obj<any>,
  T: Obj<any>
> = {[P in $Keys<T> | $Keys<K>]: $ElementType<{ 1: $ElementType<T, P>, 0: $ElementType<K, P> }, ObjectHasKey<T, P>>};

export type IntersectionObjectKeys<A, B> = $ElementType<Pick<KeyedSafe<B>, $Keys<A>>, $Keys<A>>;

export type IntersectionObjects<A, B> = Pick<A, IntersectionObjectKeys<A, B>>;

export type Simplify<T> = Pick<T, $Keys<T>>;

export type Swap<
    T: Obj<string>,
    Keys: $Keys<T> = $Keys<T>,
    Vals: string = $ElementType<T, Keys>
> = {[P1 in Vals]: $ElementType<$ObjectMap<T, <P2>(P2) => If<UnionHasKey<$ElementType<T, P2>, P1>, P2, empty>>, Keys>};

// export type ObjectLength = ...
// // check the length (number of keys) of a given heterogeneous object type. doable given `UnionLength` or (object iteration + `Inc`).

export type ObjectHasStringIndex<O: {}> = $ElementType<{ 0: '0'; } & { [k: string]: '1'; }, UnionHasKey<$Keys<O>, string>>;

// types not possible yet:
// `ObjectHasNumberIndex`: accessing it works or throws, checking presence requires `ReturnType` to pattern-match and swallow these errors
// `ObjectNumberKeys`: a `number` variant of `keyof`. could be pulled off given union iteration (`Partial` -> iterate to filter / cast back to number literals)... but still hard to scale past natural numbers.
// `ObjectSymbolKeys`: a `Symbol` variant of `keyof`. no clue how to go about this unless by checking a whitelisted set such as those found in standard library prototype. this feels sorta useless though.
// `ObjectHasElem`: check whether a heterogeneous object type contains a given type among its elements. This could be done given `TypesEq`.
// `FilterObject`: can be done already for fixed conditions; using a predicate function needs `ReturnType`
// `map` over heterogeneous objects: probably just needs `ReturnType`.
// object iteration: useful for e.g. `ObjectToArray`. This could enable union iteration, or the other way around.
// One strategy that comes to mind relies on converting keys to tuple (given UnionToArray) then using array iteration.
