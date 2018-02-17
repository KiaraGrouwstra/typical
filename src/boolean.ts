import { Obj, Bool } from './util';
import { Matches } from './type';

/**
 * Operations for string-based booleans (`'0'` / `'1'`).
 * These are no longer the only types we can use for conditionals,
 * but remain of value for recursion and complex conditionals.
 * @preferred
 */

/**
 * Any types considered falsy in JS,
 */
export type Falsy = undefined | null | 0 | '' | false | void | never;

/**
 * Inverts a string-based boolean (`'0'` / `'1'`).
 */
export type Not<T extends Bool> = { '1': '0'; '0': '1'; }[T];

/**
 * Logical `AND`, `&&` equivalent for string bools.
 */
export type And<
  A extends Bool,
  B extends Bool
> = ({ 1: { 1: '1' } & Obj<'0'> } & Obj<Obj<'0'>>)[A][B];

/**
 * Logical `OR`, `||` equivalent for string bools.
 */
export type Or<
  A extends Bool,
  B extends Bool
> = ({ 0: { 0: '0' } & Obj<'1'> } & Obj<Obj<'1'>>)[A][B];

/**
 * Checks whether a string bool has an interminate result, that is, `'1' | '0'`.
 */
export type Indeterminate<T extends string> = And<
  Matches<'0', T>,
  Matches<'1', T>
>;

/**
 * Checks whether a string bool has an terminate result, that is, either `'1'` or `'0'`, but not their union.
 */
export type Determinate<T extends Bool> = Not<Indeterminate<T>>;

/**
 * Checks whether a string bool has `'1'`, yet not `'0'`.
 */
export type DefinitelyYes<T extends Bool> = And<T, Determinate<T>>;

/**
 * Checks whether a string bool has `'0'`, yet not `'1'`.
 */
export type DefinitelyNo<T extends Bool> = And<Not<T>, Determinate<T>>;

/**
 * Checks whether a type literal is falsy.
 */
export type IsFalsy<V> = Matches<V, Falsy>;

/**
 * Checks whether a type literal is truthy.
 */
export type IsTruthy<V> = Not<IsFalsy<V>>;
