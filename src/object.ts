import { If, Obj, The, Intersection } from './util';
import { UnionHasKey, UnionsOverlap, Diff } from './union';
import { TupleHasIndex, IsArrayType } from './array';
import { NumArr } from './fixtures';
import { NumberToString, StringToNumber } from './cast';

type PrototypeMethods = 'toLocaleString' | 'toString' //| 'constructor' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'valueOf' | '__defineGetter__' | '__defineSetter__' | '__lookupGetter__' | '__lookupSetter__' | '__proto__';
type Prototype = {[K in PrototypeMethods]: K };
// type PrototypeHas<K extends string> = ObjectHasKey<Prototype, K>;

// export type ObjectProp<O extends Obj<any>, K extends string> = O[K]; // trivial

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

export type ObjProp<O extends Obj<any>, K extends string, Default = never> = If<ObjectHasKeySafe<O, K>, O[K], Default>;

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>; // {[P in Diff<keyof T, K>]: T[P]}

export type Overwrite<K, T> = {[P in keyof T | keyof K]: { 1: T[P], 0: K[P] }[ObjectHasKey<T, P>]};

export type IntersectionObjectKeys<A, B> = Pick<KeyedSafe<B>, keyof A>[keyof A];

export type IntersectionObjects<A, B> = Pick<A, IntersectionObjectKeys<A, B>>;

export type ObjectValsToUnion<O> = O[keyof O];

export interface ObjectHasStringIndex {
  (o: { [k: string]: any }): '1';
  (o: {}): '0';
};
// export type ObjectHasStringIndexTestT = ObjectHasStringIndex({ [k: string]: 123 }); // '1'
// export type ObjectHasStringIndexTestF = ObjectHasStringIndex({ a: 123 }); // '0'
// // ^ getting the return type of a function: proposal #6606

export type Simplify<T> = Pick<T, keyof T>;
