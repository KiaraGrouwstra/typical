/**
 * An object allowing one to decrease a number by one.
 */
export type Dec = { [i: number]: number; 0: -1; 1: 0; 2: 1; 3: 2; 4: 3; 5: 4; 6: 5; 7: 6; 8: 7; 9: 8 };
// R.pipe(R.range(0), R.map(R.dec), JSON.stringify)(256)
