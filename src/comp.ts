import { The, If } from './util';
import { NumberToString, StringToNumber } from './cast';
import { Dec } from './number';
import { DefinitelyYes } from './boolean';
import { Matches } from './type';
import { UnionHasKey } from './union';

export type StringsEqual<
  A extends string,
  B extends string
> = UnionHasKey<A, B>;
// ^ deprecated: ditch for Matches

export type NumbersEqual<
  A extends number,
  B extends number
> = DefinitelyYes<StringsEqual<
  NumberToString[A],
  NumberToString[B]
>>;
// ^ deprecated: ditch for Matches

export type Gt<
  A extends number,
  B extends number
> = {
  1: '0',
  0: B extends 0 ? '1' : Gt<Dec[A], Dec[B]>,
}[Matches<A, 0>];

export type Lt<
  A extends number,
  B extends number
> = {
  1: '0',
  0: A extends 0 ? '1' : Lt<Dec[A], Dec[B]>,
}[Matches<B, 0>];

export type Gte<
  A extends number,
  B extends number
> = {
  1: '1',
  0: A extends 0 ? '0' : Gte<Dec[A], Dec[B]>,
}[Matches<B, 0>];

export type Lte<
  A extends number,
  B extends number
> = {
  1: '1',
  0: B extends 0 ? '0' : Lte<Dec[A], Dec[B]>,
}[Matches<A, 0>];

export type Max<
  A extends number,
  B extends number
> = If<Gt<A, B>, A, B>;

export type Min<
  A extends number,
  B extends number
> = If<Lt<A, B>, A, B>;
