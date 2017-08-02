import { Obj } from './util';
import { UnionHasKey } from './union';

export type Falsy = undefined | null | 0 | '' | void | never;

export type Not<T extends string> = { '1': '0'; '0': '1'; }[T];

export type And<
  A extends string,
  B extends string
> = ({ 1: { 1: '1' } & Obj<'0'> } & Obj<Obj<'0'>>)[A][B];

export type Or<A, B> = ({ 0: { 0: '0' } & Obj<'1'> } & Obj<Obj<'1'>>)[A][B];

// equality checks: use StringsEqual

export type Indeterminate<T extends string> = And<
  UnionHasKey<T, '0'>,
  UnionHasKey<T, '1'>
>;

export type Determinate<T extends string> = Not<Indeterminate<T>>;

export type DefinitelyYes<T extends string> = And<T, Determinate<T>>;

export type DefinitelyNo<T extends string> = And<Not<T>, Determinate<T>>;

// export type IsFalsy<V> = Matches<V, Falsy>;
// export type IsTruthy<V> = Not<IsFalsy<V>>;
