export { Argument } from './Argument';
export { Arguments } from './Arguments';
export { Fn } from './Fn';
export { IsValidArg } from './IsValidArg';
export { NumberOfArgs } from './NumberOfArgs';

/**
 * Type functions operating on function types.
 * @preferred
 */

// todo:
// - `ReturnType`: get the return type of function expressions for given parameter types -- #6606 (dupes: #4233, #6239, #16372)
// - conversion of parameters from/to tuple types: see variadic kinds at #5453
// - currying, parameter-sensitive function composition, needs #5453
// - conditionally throwing 'custom' errors: given `ReturnType`, apply a function with arguments that would not match its requested param types
// - constraints: e.g. divisor of a division function may not be `0`. extra generic to only resolve for good input, e.g.:
// `function div<B extends number, NotZero = { (v: '1') => 'whatever'; }({ (v: 0) => '0'; (v: number) => '1'; }(B))>(a: number, b: B)`
