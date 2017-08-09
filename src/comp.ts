import { The, If } from './util';
import { NumberToString, StringToNumber } from './cast';
import { Dec } from './number';
import { DefinitelyYes } from './boolean';
import { UnionHasKey } from './union';

export type StringsEqual<
  A extends string,
  B extends string
> = UnionHasKey<A, B>;

export type NumbersEqual<
  A extends number,
  B extends number
> = DefinitelyYes<StringsEqual<
  NumberToString[StringToNumber[A]],
  NumberToString[StringToNumber[B]]
>>;
// > = UnionHasKey<NumberToString[StringToNumber[A]], NumberToString[StringToNumber[B]]>;
// ^ #15768, TS2536 `X cannot be used to index Y` on generic

export type Gt<
  A extends number,
  B extends number
> = {
  1: '0',
  0: If<NumbersEqual<0, B>, '1', Gt<Dec[A], Dec[B]>>,
}[NumbersEqual<0, A>];

export type Lt<
  A extends number,
  B extends number
> = {
  1: '0',
  0: If<NumbersEqual<0, A>, '1', Lt<Dec[A], Dec[B]>>,
}[NumbersEqual<0, B>];

export type Gte<
  A extends number,
  B extends number
> = {
  1: '1',
  0: If<NumbersEqual<0, A>, '0', Gte<Dec[A], Dec[B]>>,
}[NumbersEqual<0, B>];

export type Lte<
  A extends number,
  B extends number
> = {
  1: '1',
  0: If<NumbersEqual<0, B>, '0', Lte<Dec[A], Dec[B]>>,
}[NumbersEqual<0, A>];

// export type Max<
//   A extends number,
//   B extends number
// > = If<Gt<A, B>, A, B>;
// // Error: Excessive stack depth comparing types ... and ...

// export type Min<
//   A extends number,
//   B extends number
// > = If<Lt<A, B>, A, B>;
// // Error: Excessive stack depth comparing types ... and ...
