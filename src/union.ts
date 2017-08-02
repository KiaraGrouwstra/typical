import { the, Obj } from './util';
import { Not, And } from './boolean';
import { ObjectHasKey, KeyedSafe } from './object';

export type UnionHasKey<Union extends string, K extends string> = ({[S in Union]: '1' } & Obj<'0'>)[K];
// export type UnionHasKey<Union extends string, K extends string> = And<({[S in Union]: '1' } & Obj<'0'>)[K], ({[S in K]: '1' } & Obj<'0'>)[Union]>;

export type Indeterminate<T extends string> = And<
  UnionHasKey<T, '0'>,
  UnionHasKey<T, '1'>
>;

export type Determinate<T extends string> = Not<Indeterminate<T>>;

export type DefinitelyYes<T extends string> = And<T, Determinate<T>>;

export type DefinitelyNo<T extends string> = And<Not<T>, Determinate<T>>;

export type UnionToObject<Keys extends string> = { [K in Keys]: K };

export type UnionToObjectSafe<T extends string> = UnionToObject<T> & Obj<never>;

export type IntersectionUnions<Big extends string, Small extends string> = KeyedSafe<UnionToObject<Small>>[Big];

export type UnionContained<T extends string, U extends string> = DefinitelyYes<({ [P in U]: '1' } & Obj<'0'>)[T | U]>;

export type UnionEmpty<T extends string> =　And<UnionContained<T, 'foo'>, UnionContained<T, 'bar'>>;

export type UnionsOverlap<Big extends string, Small extends string> = Not<UnionEmpty<IntersectionUnions<Big, Small>>>;

// export type IsUnion<T extends string> = { [P in T]: UnionContained<T, P> }//[T];
export type IsUnion<
T extends string,
O extends { [P in T]: UnionContained<T, P> }
        = { [P in T]: UnionContained<T, P> }
> = O[T];

export type Diff<T extends string, U extends string> =
  ({[P in T]: P } &
  { [P in U]: never } & // toString: "toString"; toLocaleString: "toLocaleString"; 
  { [k: string]: never })[T]; // toString: "toString"; toLocaleString: "toLocaleString"; 
// ^ needs TS 2.5

// v alternative for older TS
type UnionDiff_<Big extends string, Small extends string> =
  {[K in Big]: { 1: UnionToObjectSafe<Big>[K], 0: never }[Not<UnionHasKey<Small, K>>]}//[Big];

export type UnionDiff<
  Big extends string,
  Small extends string,
  Step extends UnionDiff_<Big, Small> = UnionDiff_<Big, Small>
> = Step[Big];
