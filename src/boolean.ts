import { Obj } from './util';
import { SwitchObj } from './object';

export type Falsy = undefined | null | 0 | '' | void | never;

export type Not<T extends string> = SwitchObj<T, 'InvalidNotParam', {
  '1': '0';
  '0': '1';
}>;
// export type Not<T extends string> = { '1': '0'; '0': '1'; };

export type And<
  A extends string,
  B extends string
> = ({ 1: { 1: '1' } & Obj<'0'> } & Obj<Obj<'0'>>)[A][B];

export type Or<A, B> = ({ 0: { 0: '0' } & Obj<'1'> } & Obj<Obj<'1'>>)[A][B];

export type BEq<
  A extends string,
  B extends string
> = ({ [K in A]: '1' } & Obj<'0'>)[B];

export type Neq<
  A extends string,
  B extends string
> = Not<BEq<A, B>>;

// export type IsFalsy<V> = Matches<V, Falsy>;
// export type IsTruthy<V> = Not<IsFalsy<V>>;
