export function the<T, V extends T>() {}

export type Obj<T> = { [k: string]: T };

export type And<
  A extends '0'|'1',
  B extends '0'|'1'
> = ({ 1: { 1: '1' } & Obj<'0'> } & Obj<Obj<'0'>>)[A][B];

export type UnionHasKey<
  Union extends string,
  K extends string
> = ({[S in Union]: '1' } & Obj<'0'>)[K];

// type A = And<
//   UnionHasKey<'0'|'1', '0'>,
//   UnionHasKey<'0'|'1', '1'>
// >;
// '1'
the<'1', And<
  UnionHasKey<'0'|'1', '0'>,
  UnionHasKey<'0'|'1', '1'>
>>();

export type Indeterminate<T extends '0'|'1'> = And<
  UnionHasKey<T, '0'>,
  UnionHasKey<T, '1'>
>;

// type B = Indeterminate<'0'|'1'>;
// yields '0', expecting '1' as well
the<'1', Indeterminate<'0'|'1'>>();
