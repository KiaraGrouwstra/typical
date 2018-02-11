// @flow

export type If<Cond: Bool, Then, Else> = $ElementType<{ 1: Then, 0: Else }, Cond>;

export type Inc<N/*: number*/> = $ElementType<{ [i: number]: number; 0: 1; 1: 2; 2: 3; 3: 4; 4: 5; 5: 6; 6: 7; 7: 8; 8: 9; 9: 10 }, N>;
// R.pipe(R.range(0), R.map(R.inc), JSON.stringify)(256)
export type Dec<N/*: number*/> = $ElementType<{ [i: number]: number; 0: -1; 1: 0; 2: 1; 3: 2; 4: 3; 5: 4; 6: 5; 7: 6; 8: 7; 9: 8 }, N>;
// R.pipe(R.range(0), R.map(R.dec), JSON.stringify)(256)

export type Add<
  A/*: number*/,
  B/*: number*/
> = $ElementType<{ 1: A, 0: Add<Inc<A>, Dec<B>> }, NumbersEqual<0, B>>;

type a = Add<3, 2>;

export type Add2<
  A/*: number*/,
  B/*: number*/
> = If<NumbersEqual<0, B>, A, Add<Inc<A>, Dec<B>>>;

type b = Add2<3, 2>;

const c: { 0: 0 } = [0];
const d: { 0: 0, length: 1 } = [0];
const e: { 0: 0 } = [1];
const f: { 0: 0 } = [0, 1];
const g: { 0: 0, 1: 1 } = [0];
