// @flow
import type { Obj, Bool } from './util';
import type { UnionHasKey } from './union';

export type Falsy = null | 0 | '' | void | empty;

export type Not<T: Bool> = $ElementType<{ '1': '0'; '0': '1'; }, T>;

export type And<
  A: Bool,
  B: Bool
> = $ElementType<$ElementType<{ 1: { 1: '1' } & Obj<'0'> } & Obj<Obj<'0'>>, A>, B>;

export type Or<
  A: Bool,
  B: Bool
> = $ElementType<$ElementType<{ 0: { 0: '0' } & Obj<'1'> } & Obj<Obj<'1'>>, A>, B>;

// equality checks: use StringsEqual

export type Indeterminate<T: string> = And<
  UnionHasKey<T, '0'>,
  UnionHasKey<T, '1'>
>;

export type Determinate<T: Bool> = Not<Indeterminate<T>>;

export type DefinitelyYes<T: Bool> = And<T, Determinate<T>>;

export type DefinitelyNo<T: Bool> = And<Not<T>, Determinate<T>>;

// export type IsFalsy<V> = Matches<V, Falsy>;
// export type IsTruthy<V> = Not<IsFalsy<V>>;
