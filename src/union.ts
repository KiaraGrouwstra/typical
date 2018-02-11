import { the, Obj } from './util';
import { Not, And, DefinitelyYes } from './boolean';
import { ObjectHasKey } from './object';

// note: all operations here are about unions of string literals.
// could rename this module to `string`, but it operates on the unions, not the actual strings.

export type UnionHasKey<Union extends string, K extends string> = ({[S in Union]: '1' } & Obj<'0'>)[K];
// export type UnionHasKey<Union extends string, K extends string> = And<({[S in Union]: '1' } & Obj<'0'>)[K], ({[S in K]: '1' } & Obj<'0'>)[Union]>;

export type UnionToObject<Keys extends string> = { [K in Keys]: K };

export type UnionContained<T extends string, U extends string> = DefinitelyYes<({ [P in U]: '1' } & Obj<'0'>)[T | U]>;

export type UnionEmpty<T extends string> =　And<UnionContained<T, 'foo'>, UnionContained<T, 'bar'>>;

export type UnionsOverlap<Big extends string, Small extends string> = Not<UnionEmpty<Extract<Big, Small>>>;

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
// - UnionHasType: general case, check whether a union of arbitrary types contains a given type.
// could be achieved using TypesEq. plugging a union into it should return e.g. "0" | "1" in case it contains a match -- at that point UnionHasKey works.
// - UnionHasType: general case, check whether a union of arbitrary types contains a given type.
// could be achieved using TypesEq. plugging a union into it should return e.g. "0" | "1" in case it contains a match -- at that point UnionHasKey works.
