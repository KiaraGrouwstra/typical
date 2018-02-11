import { Obj, Bool } from './util';
import { Matches } from './type';

export type Falsy = undefined | null | 0 | '' | void | never;

export type Not<T extends Bool> = { '1': '0'; '0': '1'; }[T];

export type And<
  A extends Bool,
  B extends Bool
> = ({ 1: { 1: '1' } & Obj<'0'> } & Obj<Obj<'0'>>)[A][B];

export type Or<
  A extends Bool,
  B extends Bool
> = ({ 0: { 0: '0' } & Obj<'1'> } & Obj<Obj<'1'>>)[A][B];

// equality checks: use StringsEqual

export type Indeterminate<T extends string> = And<
  Matches<'0', T>,
  Matches<'1', T>
>;

export type Determinate<T extends Bool> = Not<Indeterminate<T>>;

export type DefinitelyYes<T extends Bool> = And<T, Determinate<T>>;

export type DefinitelyNo<T extends Bool> = And<Not<T>, Determinate<T>>;

// export type IsFalsy<V> = Matches<V, Falsy>;
// export type IsTruthy<V> = Not<IsFalsy<V>>;
