import { If, Obj, The, Intersection } from './util';
import { And, Not } from './boolean';
import { UnionHasKey, UnionsOverlap } from './union';
import { TupleHasIndex, IsArrayType } from './array';
import { NumberToString, StringToNumber, NumberToNumber } from './cast';
import { Matches, Widen } from './type';

/**
 * Type functions to operate on object types.
 * @preferred
 */

/**
 * Union of keys used to access prototype methods on object types.
 */
export type PrototypeMethods = 'toLocaleString' | 'toString' //| 'constructor' | 'hasOwnProperty' | 'isPrototypeOf' | 'propertyIsEnumerable' | 'valueOf' | '__defineGetter__' | '__defineSetter__' | '__lookupGetter__' | '__lookupSetter__' | '__proto__';

/**
 * Object of keys used to access prototype methods in object types.
 */
export type Prototype = {[K in PrototypeMethods]: K };

/**
 * Check if a key is among those used to access prototype methods on object types.
 */
export type PrototypeHas<K extends string> = ObjectHasKey<Prototype, K>;

/**
 * Use an object type to make an object type using its keys as both keys and values.
 */
export type Keyed<T> = {[K in keyof T]: K };

/**
 * Use an object type to make an object type using its keys as both keys and values.
 * Additionally has a string index of `never` to allow safe property access.
 */
export type KeyedSafe<T> = Keyed<T> & Obj<never>;

/**
 * Check if an object type has a certain key.
 * Returns prototype methods for keys like `toString`.
 */
export type ObjectHasKey<
  O extends {},
  K extends string
> = UnionHasKey<keyof O, K>;
// > = Matches<K, keyof O>;

/**
 * Check if a type (object or tuple) has a certain key.
 */
export type HasKey<T, K extends number|string> = T extends any[] ?
  TupleHasIndex<T & { length: number }, Intersection<number, K>> :
  ObjectHasKey<T, Intersection<string, K>>;

/**
 * Check if an object type has a certain key.
 * Will not look for prototype methods for keys like `toString`.
 */
export type ObjectHasKeySafe<O extends object, K extends string> = UnionsOverlap<keyof O, K>;

/**
 * Element access for object types. A `toString`-proof `T[K]`.
 * Should prevent 'toString' issues of O[K], but the current implementations of
 * UnionHasKey and UnionsOverlap won't suffice as they suffer from the same bug.
 * An alternative based on union iteration could potentially prevent this.
 */
// export type ObjectProp<O extends Obj<any>, K extends string, Default = never> = If<ObjectHasKeySafe<O, K>, O[K], Default>;
export type ObjectProp<O extends Obj<any>, K extends string> = If<
    And<
        UnionsOverlap<keyof O, 'toString' | 'toLocaleString'>,
        And<
            ObjectHasStringIndex<O>,
            Not<Matches<K, keyof O>>
        >
    >,
    O[string],
    O[K]
>;

/**
 * Omit the given keys from an object type.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Merge second object into the first.
 * Deprecated, switch to Spread.
 * @deprecated
 */
// export type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
// ^ no-dependency version by Anders, works fine but uses intersection, yielding verbose types
// export type Overwrite<T, U, Int = { [P in Exclude<keyof T, keyof U>]: T[P] } & U> = Pick<Int, keyof Int>;
// ^ my attempt at cleaning out the intersection, somehow makes AppendList/FromPairs/ZipObject fail
export type Overwrite<
  K extends Obj<any>,
  T extends Obj<any>
> = {[P in keyof T | keyof K]: { 1: T[P], 0: K[P] }[ObjectHasKey<T, P>]};

/**
 * Yields the intersection of the keys of two objects.
 */
export type IntersectionObjectKeys<A, B> = Pick<KeyedSafe<B>, keyof A>[keyof A];

/**
 * Filter an object based on the keys present in another object.
 */
export type IntersectionObjects<A, B> = Pick<A, IntersectionObjectKeys<A, B>>;

/**
 * Get the values of an object type as a union.
 */
export type ObjectValsToUnion<O> = O[keyof O];

/**
 * Simplify an object type to strip out intersections.
 */
export type Simplify<T> = Pick<T, keyof T>;

/**
 * Swap the keys and values of an object type with string literals as values.
 */
export type Swap<
    T extends Obj<string>,
    Keys extends keyof T = keyof T,
    Vals extends string = T[Keys]
> = {[P1 in Vals]: {[P2 in Keys]: P1 extends T[P2] ? P2 : never }[Keys]};

/**
 * Check if an object has a string index.
 */
export type ObjectHasStringIndex<O extends {}> =
    ({ 0: '0'; } & { [k: string]: '1'; })[Matches<string, keyof O>];

/**
 * Strip an object type of its string index.
 */
export type StripIndex<T> = { [P in keyof T]: string extends P ? never : T[P] };

/**
 * Calculate the type after converting to JSON and back.
 * @see https://github.com/Microsoft/TypeScript/issues/21838
 */
export type Jsonified<T> =
    T extends string | number | boolean | null ? T
    : T extends undefined | Function ? undefined
    : T extends { toJSON(): infer R } ? R
    : T extends object ? JsonifiedObject<T>
    : "wat";
type JsonifiedObject<T extends object> = { [K in keyof T]: Jsonified<T[K]> };

/**
 * Intersection of all value types.
 * @see https://github.com/Microsoft/TypeScript/pull/21496#issuecomment-363159497
 */
export type IntersectValueOf<T> = (
    { [K in keyof T]: (x: T[K]) => void }
) extends Record<keyof T, (x: infer V) => void> ? V: never;

/**
 * Get all property names that are literals, i.e. all but the (string) index.
 */
export type LiteralPropNames<T> = { [K in keyof T]: string extends T[K] ? never : K }[keyof T];
/**
 * Get all properties with names that are literals, i.e. for all but the (string) index.
 */
export type LiteralProps<T> = Pick<T, LiteralPropNames<T>>;

/**
 * Get all property names matching a type.
 */
export type MatchingPropNames<T, X> = { [K in keyof T]: T[K] extends X ? K : never }[keyof T];
/**
 * Get all properties with names matching a type.
 */
export type MatchingProps<T, X> = Pick<T, MatchingPropNames<T, X>>;
/**
 * Get all property names not matching a type.
 */
export type NonMatchingPropNames<T, X> = { [K in keyof T]: T[K] extends X ? never : K }[keyof T];
/**
 * Get all properties with names not matching a type.
 */
export type NonMatchingProps<T, X> = Pick<T, NonMatchingPropNames<T, X>>;

/**
 * Get all property names holding functions.
 */
export type FunctionPropNames<T> = MatchingPropNames<T, Function>;
/**
 * Get all function properties.
 */
export type FunctionProps<T> = MatchingProps<T, Function>;
/**
 * Get all property names holding non-functions.
 */
export type NonFunctionPropNames<T> = NonMatchingPropNames<T, Function>;
/**
 * Get all non-function properties.
 */
export type NonFunctionProps<T> = NonMatchingProps<T, Function>;

/**
 * Get all names of properties with types that include undefined.
 */
export type OptionalPropNames<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];
/**
 * Get all properties that include undefined.
 */
export type OptionalProps<T> = Pick<T, OptionalPropNames<T>>;
/**
 * Get all names of properties with types that don't include undefined.
 */
export type RequiredPropNames<T> = { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T];
/**
 * Get all properties with types that don't include undefined.
 */
export type RequiredProps<T> = Pick<T, RequiredPropNames<T>>;

/**
 * Type of `{ ...L, ...R }` / `Object.assign(L, R)`.
 */
export type Spread<L, R> =
    /** properties in L that don't exist in R */
      Pick<L, Exclude<keyof L, keyof R>>
    /** properties in R with types that exclude undefined */
    & Pick<R, Exclude<keyof R, OptionalPropNames<R>>>
    /** properties in R, with types that include undefined, that don't exist in L */
    & Pick<R, Exclude<OptionalPropNames<R>, keyof L>>
    /** properties in R, with types that include undefined, that exist in L */
    & SpreadProps<L, R, OptionalPropNames<R> & keyof L>;

/**
 * Common properties from L and R with undefined in R[K] replaced by type in L[K]
 */
export type SpreadProps<L, R, K extends keyof L & keyof R> =
    { [P in K]: L[P] | Exclude<R[P], undefined> };

/**
 * Mark a type and all its (sub) properties as read-only.
 */
export type DeepReadonly<T> =
    T extends any[] ? DeepReadonlyArray<T[number]> :
    T extends object ? DeepReadonlyObject<T> :
    T;
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
type DeepReadonlyObject<T> = {
    +readonly [P in NonFunctionPropNames<T>]: DeepReadonly<T[P]>;
};

/**
 * Remove `readonly`.
 */
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * Mark a type and all its (sub) properties as mutable.
 */
export type DeepMutable<T> =
    T extends any[] ? DeepMutableArray<T[number]> :
    T extends object ? DeepMutableObject<T> :
    T;
interface DeepMutableArray<T> extends Array<DeepMutable<T>> {}
type DeepMutableObject<T> = {
    -readonly [P in NonFunctionPropNames<T>]: DeepMutable<T[P]>;
};

/**
 * Widen a type and all its (sub) properties.
 */
export type DeepWiden<T> =
    T extends any[] ? DeepWidenArray<T[number]> :
    T extends object ? DeepWidenObject<T> :
    Widen<T>;
interface DeepWidenArray<T> extends Array<DeepWiden<T>> {}
type DeepWidenObject<T> = {
    [P in keyof T]: DeepWiden<T[P]>;
};

/**
 * Make a type and all its (sub) properties optional.
 */
export type DeepPartial<T> =
    T extends any[] ? DeepPartialArray<T[number]> :
    T extends object ? DeepPartialObject<T> :
    T;
interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
type DeepPartialObject<T> = {
    [P in keyof T]+?: DeepPartial<T[P]>;
};

/**
 * Make a type and all its (sub) properties required.
 */
export type DeepRequired<T> = NonNullable<
    T extends any[] ? DeepRequiredArray<T[number]> :
    T extends object ? DeepRequiredObject<T> :
    T
>;
// interface DeepRequiredArray<T> extends Array<DeepRequired<T>> {}
type DeepRequiredObject<T> = {
    [P in keyof T]+?: DeepRequired<T[P]>;
};

/**
 * Strip null/undefined from a type and all its (sub) properties.
 */
export type DeepAssert<T> =
    T extends any[] ? DeepAssertArray<T[number]> :
    T extends object ? DeepAssertObject<T> :
    NonNullable<T>;
interface DeepAssertArray<T> extends Array<DeepAssert<T>> {}
type DeepAssertObject<T> = {
    [P in keyof T]: DeepAssert<T[P]>;
};

/**
 * Check whether an object has a number index.
 */
export type ObjectHasNumberIndex<T> = T extends { [i: number]: any } ? '1' : '0';

/**
 * Check whether a heterogeneous object type contains a given type among its elements.
 */
export type ObjectHasElem<T, E> = Matches<E, ObjectValsToUnion<T>>;

/**
 * A `number` variant of `keyof`, giving a union of a tuple/object with number-like keys.
 * Technically returns string literals e.g. `"3"` rather than `3` -- works for element access.
 */
export type ObjectNumberKeys<T> = Extract<keyof T, keyof NumberToNumber>;

/**
 * Check the length (number of keys) of a given heterogeneous object type.
 * Doable given `UnionLength` or (object iteration + `Inc`).
 */
// export type ObjectLength = ...

// types not possible yet:
// `ObjectSymbolKeys`: a `Symbol` variant of `keyof`. no clue how to go about this unless by checking a whitelisted set such as those found in standard library prototype. this feels sorta useless though.
// `map` over heterogeneous objects: probably just needs `ReturnType`.
// object iteration: useful for e.g. `ObjectToArray`. This could enable union iteration, or the other way around.
// One strategy that comes to mind relies on converting keys to tuple (given UnionToArray) then using array iteration.
