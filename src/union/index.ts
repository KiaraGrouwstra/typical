export { IsUnion } from './IsUnion';
export { UnionContained } from './UnionContained';
export { UnionEmpty } from './UnionEmpty';
export { UnionHasKey } from './UnionHasKey';
export { UnionsOverlap } from './UnionsOverlap';
export { UnionToObject } from './UnionToObject';

/**
 * Type functions to operate on unions.
 * Note: all operations here are about unions of string literals.
 * I could rename this module to `string`, but it operates on the unions, not the actual strings.
 * @preferred
 */

// todo:
// - a way to access union elements, e.g. going from "a" | "b" | "c" to "a". this could enable union iteration using Diff if they're all string literals, which in turn could enable object iteration. or the other way around.
// - IsUnionType -- solvable today only for unions consisting of known sets of keys, see my Indeterminate; a proper solution could be made using union iteration or a way to access arbitrary / random elements (e.g. with conversion to tuple type)
// - UnionLength: check the length of a union, i.e. how many options it is composed of.
