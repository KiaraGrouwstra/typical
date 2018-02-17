import { the, Obj } from './util';
import { Not, And, DefinitelyYes } from './boolean';
import { ObjectHasKey } from './object';

/**
 * Type functions to operate on unions.
 * Note: all operations here are about unions of string literals.
 * I could rename this module to `string`, but it operates on the unions, not the actual strings.
 * @preferred
 */

/**
 * Check if a union contains a given string literal.
 * Deprecated, ditch for `Matches`.
 * @deprecated
 */
export type UnionHasKey<Union extends string, K extends string> = ({[S in Union]: '1' } & Obj<'0'>)[K];

/**
 * Use a union of string literals to make an object using those
 * strings as both keys and values.
 */
export type UnionToObject<Keys extends string> = { [K in Keys]: K };

/**
 * Check if a union is wholly contained in another one.
 * Deprecated, ditch for `Matches`.
 * @deprecated
 */
export type UnionContained<T extends string, U extends string> = DefinitelyYes<({ [P in U]: '1' } & Obj<'0'>)[T | U]>;

/**
 * Check if a union is empty, that is, if a type is `never`.
 */
export type UnionEmpty<T extends string> =　And<UnionContained<T, 'foo'>, UnionContained<T, 'bar'>>;

/**
 * Check if there is any overlap between two unions of string literals.
 */
export type UnionsOverlap<Big extends string, Small extends string> = Not<UnionEmpty<Extract<Big, Small>>>;

/**
 * Check whether a type is a union (of string literals).
 */
// export type IsUnion<T extends string> = { [P in T]: UnionContained<T, P> }//[T];
export type IsUnion<
T extends string,
O extends { [P in T]: UnionContained<T, P> }
        = { [P in T]: UnionContained<T, P> }
> = O[T];

// todo:
// - a way to access union elements, e.g. going from "a" | "b" | "c" to "a". this could enable union iteration using Diff if they're all string literals, which in turn could enable object iteration. or the other way around.
// - IsUnionType -- solvable today only for unions consisting of known sets of keys, see my Indeterminate; a proper solution could be made using union iteration or a way to access arbitrary / random elements (e.g. with conversion to tuple type)
// - UnionLength: check the length of a union, i.e. how many options it is composed of.
