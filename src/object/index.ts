export { DeepAssert } from './DeepAssert';
export { DeepMutable } from './DeepMutable';
export { DeepPartial } from './DeepPartial';
export { DeepReadonly } from './DeepReadonly';
export { DeepRequired } from './DeepRequired';
export { DeepWiden } from './DeepWiden';
export { FunctionPropNames } from './FunctionPropNames';
export { FunctionProps } from './FunctionProps';
export { HasKey } from './HasKey';
export { IntersectionObjectKeys } from './IntersectionObjectKeys';
export { IntersectionObjects } from './IntersectionObjects';
export { IntersectValueOf } from './IntersectValueOf';
export { Jsonified } from './Jsonified';
export { Keyed } from './Keyed';
export { KeyedSafe } from './KeyedSafe';
export { LiteralPropNames } from './LiteralPropNames';
export { LiteralProps } from './LiteralProps';
export { MatchingPropNames } from './MatchingPropNames';
export { MatchingProps } from './MatchingProps';
export { Mutable } from './Mutable';
export { NonFunctionPropNames } from './NonFunctionPropNames';
export { NonFunctionProps } from './NonFunctionProps';
export { NonMatchingPropNames } from './NonMatchingPropNames';
export { NonMatchingProps } from './NonMatchingProps';
export { ObjectHasElem } from './ObjectHasElem';
export { ObjectHasKey } from './ObjectHasKey';
export { ObjectHasKeySafe } from './ObjectHasKeySafe';
export { ObjectHasNumberIndex } from './ObjectHasNumberIndex';
export { ObjectHasStringIndex } from './ObjectHasStringIndex';
export { ObjectNumberKeys } from './ObjectNumberKeys';
export { ObjectProp } from './ObjectProp';
export { ObjectValsToUnion } from './ObjectValsToUnion';
export { Omit } from './Omit';
export { OptionalPropNames } from './OptionalPropNames';
export { OptionalProps } from './OptionalProps';
export { Overwrite } from './Overwrite';
export { Prototype } from './Prototype';
export { PrototypeHas } from './PrototypeHas';
export { PrototypeMethods } from './PrototypeMethods';
export { RequiredPropNames } from './RequiredPropNames';
export { RequiredProps } from './RequiredProps';
export { Simplify } from './Simplify';
export { Spread } from './Spread';
export { SpreadProps } from './SpreadProps';
export { StripIndex } from './StripIndex';
export { Swap } from './Swap';

/**
 * Type functions to operate on object types.
 * @preferred
 */


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
