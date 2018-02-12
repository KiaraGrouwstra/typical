import { If, Obj, The, Intersection } from './util';
import { And, Not } from './boolean';
import { UnionHasKey, UnionsOverlap } from './union';
import { TupleHasIndex, IsArrayType } from './array';
import { NumberToString, StringToNumber } from './cast';
import { Matches, Widen } from './type';

type PrototypeMethods = 'toLocaleString' | 'toString' //| 'constructor' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'valueOf' | '__defineGetter__' | '__defineSetter__' | '__lookupGetter__' | '__lookupSetter__' | '__proto__';
type Prototype = {[K in PrototypeMethods]: K };
// type PrototypeHas<K extends string> = ObjectHasKey<Prototype, K>;

export type Keyed<T> = {[K in keyof T]: K };

export type KeyedSafe<T> = Keyed<T> & Obj<never>;

export type ObjectHasKey<
  O extends {},
  K extends string
> = UnionHasKey<keyof O, K>;
// > = Matches<K, keyof O>;

export type HasKey<T, K extends number|string> = T extends any[] ?
  TupleHasIndex<T & { length: number }, Intersection<number, K>> :
  ObjectHasKey<T, Intersection<string, K>>;

export type ObjectHasKeySafe<O extends object, K extends string> = UnionsOverlap<keyof O, K>;

// export type ObjectProp<O extends Obj<any>, K extends string, Default = never> = If<ObjectHasKeySafe<O, K>, O[K], Default>;
export type ObjectProp<O extends Obj<any>, K extends string> =
    If<And<UnionsOverlap<keyof O, 'toString' | 'toLocaleString'>, And<ObjectHasStringIndex<O>, Not<Matches<K, keyof O>>>>, O[string], O[K]>
// ^ should prevent 'toString' issues of O[K], but the current implementations of
// UnionHasKey and UnionsOverlap won't suffice as they suffer from the same bug.
// An alternative based on union iteration could potentially prevent this.

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// export type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
// ^ no-dependency version by Anders, works fine but uses intersection, yielding verbose types
// export type Overwrite<T, U, Int = { [P in Exclude<keyof T, keyof U>]: T[P] } & U> = Pick<Int, keyof Int>;
// ^ my attempt at cleaning out the intersection, somehow makes AppendList/FromPairs/ZipObject fail
export type Overwrite<
  K extends Obj<any>,
  T extends Obj<any>
> = {[P in keyof T | keyof K]: { 1: T[P], 0: K[P] }[ObjectHasKey<T, P>]};
// ^ merge second object into the first. deprecated, switch to Spread.

export type IntersectionObjectKeys<A, B> = Pick<KeyedSafe<B>, keyof A>[keyof A];

export type IntersectionObjects<A, B> = Pick<A, IntersectionObjectKeys<A, B>>;

export type ObjectValsToUnion<O> = O[keyof O];

export type Simplify<T> = Pick<T, keyof T>;

export type Swap<
    T extends Obj<string>,
    Keys extends keyof T = keyof T,
    Vals extends string = T[Keys]
> = {[P1 in Vals]: {[P2 in Keys]: P1 extends T[P2] ? P2 : never }[Keys]};

// export type ObjectLength = ...
// // check the length (number of keys) of a given heterogeneous object type. doable given `UnionLength` or (object iteration + `Inc`).

export type ObjectHasStringIndex<O extends {}> = ({ 0: '0'; } & { [k: string]: '1'; })[Matches<string, keyof O>];

// #21838
export type JsonifiedObject<T extends object> = { [K in keyof T]: Jsonified<T[K]> };
export type Jsonified<T> =
    T extends string | number | boolean | null ? T
    : T extends undefined | Function ? undefined
    : T extends { toJSON(): infer R } ? R
    : T extends object ? JsonfifiedObject<T>
    : "wat";

// #21496
export type IntersectValueOf<T> =
    ({[K in keyof T]: (x: T[K]) => void}) extends Record<keyof T, (x: infer V) => void> ? V: never;

// make all (sub) properties of an object optional
export type DeepPartial<T> =
    T extends any[] ? DeepPartialArray<T[number]> :
    T extends object ? DeepPartialObject<T> :
    T;
export interface DeepPartialArray<T> extends Array<DeepPartial<T>> {};
export type DeepPartialObject<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type MatchingPropertyNames<T, X> = { [K in keyof T]: T[K] extends X ? K : never }[keyof T];
export type MatchingProperties<T, X> = Pick<T, MatchingPropertyNames<T, X>>;
export type NonMatchingPropertyNames<T, X> = { [K in keyof T]: T[K] extends X ? never : K }[keyof T];
export type NonMatchingProperties<T, X> = Pick<T, NonMatchingPropertyNames<T, X>>;

export type FunctionPropertyNames<T> = MatchingPropertyNames<T, Function>;
export type FunctionProperties<T> = MatchingProperties<T, Function>;
export type NonFunctionPropertyNames<T> = NonMatchingPropertyNames<T, Function>;
export type NonFunctionProperties<T> = NonMatchingProperties<T, Function>;

// Names of properties in T with types that include undefined
export type OptionalPropertyNames<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];
export type OptionalProperties<T> = Pick<T, OptionalPropertyNames<T>>;
export type MandatoryPropertyNames<T> = { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T];
export type MandatoryProperties<T> = Pick<T, MandatoryPropertyNames<T>>;

// Type of { ...L, ...R } / Object.assign(L, R)
export type Spread<L, R> =
    // Properties in L that don't exist in R
      Pick<L, Exclude<keyof L, keyof R>>
    // Properties in R with types that exclude undefined
    & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>>
    // Properties in R, with types that include undefined, that don't exist in L
    & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>>
    // Properties in R, with types that include undefined, that exist in L
    & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>;
// Common properties from L and R with undefined in R[K] replaced by type in L[K]
export type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: L[P] | Exclude<R[P], undefined> };

// make all (sub) properties of an object read-only
export type DeepReadonly<T> =
    T extends any[] ? DeepReadonlyArray<T[number]> :
    T extends object ? DeepReadonlyObject<T> :
    T;
export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
export type DeepReadonlyObject<T> = {
    readonly [P in NonFunctionPropertyNames<T>]: DeepReadonly<T[P]>;
};

// widen a type and all its (sub) properties
export type DeepWiden<T> =
    T extends any[] ? DeepWidenArray<T[number]> :
    T extends object ? DeepWidenObject<T> :
    T;
export interface DeepWidenArray<T> extends Array<DeepWiden<T>> {}
export type DeepWidenObject<T> = {
    [P in keyof T]: DeepWiden<T[P]>;
};

// types not possible yet:
// `ObjectHasNumberIndex`: accessing it works or throws, checking presence requires `ReturnType` to pattern-match and swallow these errors
// `ObjectNumberKeys`: a `number` variant of `keyof`. could be pulled off given union iteration (`Partial` -> iterate to filter / cast back to number literals)... but still hard to scale past natural numbers.
// `ObjectSymbolKeys`: a `Symbol` variant of `keyof`. no clue how to go about this unless by checking a whitelisted set such as those found in standard library prototype. this feels sorta useless though.
// `ObjectHasElem`: check whether a heterogeneous object type contains a given type among its elements. This could be done given `TypesEq`.
// `map` over heterogeneous objects: probably just needs `ReturnType`.
// object iteration: useful for e.g. `ObjectToArray`. This could enable union iteration, or the other way around.
// One strategy that comes to mind relies on converting keys to tuple (given UnionToArray) then using array iteration.
