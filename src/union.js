// @flow
import { the, Obj } from './util';
import { Not, And, DefinitelyYes } from './boolean';
import { ObjectHasKey, KeyedSafe } from './object';

// note: all operations here are about unions of string literals.
// could rename this module to `string`, but it operates on the unions, not the actual strings.

export type UnionHasKey<Union: string, K: string> = $ElementType<{[S in Union]: '1' } & Obj<'0'>, K>;
// export type UnionHasKey<Union: string, K: string> = And<$ElementType<{[S in Union]: '1' } & Obj<'0'>, K>, $ElementType<{[S in K]: '1' } & Obj<'0'>, Union>>;

export type UnionToObject<Keys: string> = { [K in Keys]: K };

export type IntersectionUnions<Big: string, Small: string> = $ElementType<KeyedSafe<UnionToObject<Small>>, Big>;

export type UnionContained<T: string, U: string> = DefinitelyYes<$ElementType<{ [P in U]: '1' } & Obj<'0'>, T | U>>;

export type UnionEmpty<T: string> =　And<UnionContained<T, 'foo'>, UnionContained<T, 'bar'>>;

export type UnionsOverlap<Big: string, Small: string> = Not<UnionEmpty<IntersectionUnions<Big, Small>>>;

// export type IsUnion<T: string> = $ElementType<{ [P in T]: UnionContained<T, P> }, T>;
export type IsUnion<
T: string,
O: { [P in T]: UnionContained<T, P> }
        = { [P in T]: UnionContained<T, P> }
> = $ElementType<O, T>;

// todo:
// - a way to access union elements, e.g. going from "a" | "b" | "c" to "a". this could enable union iteration using Diff if they're all string literals, which in turn could enable object iteration. or the other way around.
// - IsUnionType -- solvable today only for unions consisting of known sets of keys, see my Indeterminate; a proper solution could be made using union iteration or a way to access arbitrary / random elements (e.g. with conversion to tuple type)
// - UnionLength: check the length of a union, i.e. how many options it is composed of.
// - UnionHasType: general case, check whether a union of arbitrary types contains a given type.
// could be achieved using TypesEq. plugging a union into it should return e.g. "0" | "1" in case it contains a match -- at that point UnionHasKey works.
// - UnionHasType: general case, check whether a union of arbitrary types contains a given type.
// could be achieved using TypesEq. plugging a union into it should return e.g. "0" | "1" in case it contains a match -- at that point UnionHasKey works.
