// @flow
import type { The, If } from './util';
import type { NumberToString, StringToNumber } from './cast';
import type { Dec } from './number';
import type { DefinitelyYes } from './boolean';
import type { UnionHasKey } from './union';

export type StringsEqual<
  A: string,
  B: string
> = UnionHasKey<A, B>;

export type NumbersEqual<
  A: number,
  B: number
> = DefinitelyYes<StringsEqual<
  NumberToString<A>,
  NumberToString<B>
>>;

export type Gt<
  A: number,
  B: number
> = $ElementType<{
  1: '0',
  0: If<NumbersEqual<0, B>, '1', Gt<Dec<A>, Dec<B>>>,
}, NumbersEqual<0, A>>;

export type Lt<
  A: number,
  B: number
> = $ElementType<{
  1: '0',
  0: If<NumbersEqual<0, A>, '1', Lt<Dec<A>, Dec<B>>>,
}, NumbersEqual<0, B>>;

export type Gte<
  A: number,
  B: number
> = $ElementType<{
  1: '1',
  0: If<NumbersEqual<0, A>, '0', Gte<Dec<A>, Dec<B>>>,
}, NumbersEqual<0, B>>;

export type Lte<
  A: number,
  B: number
> = $ElementType<{
  1: '1',
  0: If<NumbersEqual<0, B>, '0', Lte<Dec<A>, Dec<B>>>,
}, NumbersEqual<0, A>>;

export type Max<
  A: number,
  B: number
> = If<Gt<A, B>, A, B>;

export type Min<
  A: number,
  B: number
> = If<Lt<A, B>, A, B>;
