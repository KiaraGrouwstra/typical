// @flow
import { tsst, the } from 'tsst-tycho';
import { List } from './util';
import { Simplify } from './object';
import { TupleToObject } from './cast';

/*
// regex find-replace pair to turn `the` statements into `tsst` tests:
^((the<.*>\(\));?.*)
    it(`$2`, () => {\n      tsst(() => {\n        $1\n      }).expectToCompile();\n    });\n
*/

// test interplay types
type asdfInt = ({ a: 1 } & { c: 4 } & { b: 2, a: string } & { [k: string]: 3 })['a']
// objects considered merged, indexes ignored but real results intersect'd
type asdfUnn = ({ a: 1 } /*| { c: 4 }*/ | { b: 2, a: string } /*| { [k: string]: 3 }*/)['a'];
// ^ union of results; each object must *explicitly* contain key, no indexes
type afdsfUnn = { a: 1, b: 2, c: 3 }['a' | 'b' /*| 'd'*/];
// ^ union of results, keys must all be contained
// type afdsfUBl = { a: 1, b: 2, c: 3 }['a' | true];
// // ^ union with bad keys, also errors
type afdsfInt = { a: 1, b: 2, c: 3 }['a' /*& 'b'*/]; // impossible key, error

// interaction `?`
the<{a?:1}, Simplify<{a?:1}>>();
the<1 | undefined, {a?:1}['a']>();
the<'a', keyof {a?:1}>();

// #16072
declare function comp<A, B, C>(f: (x: A) => B, g: (x: B) => C): (x: A) => C
const wrapper = comp(x => [x], y => ({ p: y }));  // (x: {}) => { p: {}[] }

type ArrProto<T extends List<any>> = Simplify<T> & {
  [Symbol.iterator]: () => IterableIterator<T[-1]>,
  [Symbol.unscopables]: () => { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; }
} & { [i: number]: T[-1] };
// ^ error outside of Playground: can't find Symbol

// #6229
const foo: [1, "a"] = [1, "a"]; // no cast with #16389
var t3: TupleToObject<typeof foo> = foo;
// t3[2]; // error: Element implicitly has an 'any' type because type 'Pick<{ 0: 1; } & { 1: "a"; }, "1" | "0">' has no index signature.
var t1: [number, string] = <ArrProto<[1, "a"]>>[1, "a"];
// ^ ok
// v make either of these error:
var t5a: [number, string] = [1, "a", "b"];
var t5b: [number, string] = <ArrProto<[1, "a", "b"]>> [1, "a", "b"];
var t5c: TupleToObject<[number, string]> = [1, "a", "b"];
var t5d: TupleToObject<[number, string]> = <TupleToObject<[1, "a", "b"]>> [1, "a", "b"];
var t5e: TupleToObject<[number, string]> = <ArrProto<[1, "a", "b"]>> [1, "a", "b"];

// type neverAccessTest = {a:1}[never]

// check how type moving works:
// no match: messed up intersection
the<string & number, string & (number | never)>();
// match: take it
the<string, string & (string | never)>();
// match or any: any, type-checking stops
the<'foo', string & (string | any)>();
// miss or any: any, type-checking stops
the<'bar', string & (number | any)>();
// super-type: stick with sub-type (& super)
the<'a' /* & super*/, 'a' & (string | never)>();
// sub-type: narrow down
the<'a', string & ('a' | never)>();
// multiple matches (same or narrower): widest
the<string, string & (string | 'a')>();
// multiple matches (same or wider): widest
the<'a', 'a' & (string | 'a')>();
// hit and miss: hit (| intersection)
the<string, string & (string | number)>();

// basic operations
the<1, [1][0]>();
the<'a', keyof {a:1}>();
the<{a:'a'}, {[P in 'a']:P}>();
the<number & string, number & string>();
the<number | string, number | string>();

// never
// the<never, never[0]>(); // Property '0' does not exist on type 'never'
// the<never, [1][never]>(); // Type 'never' cannot be used as an index type
the<never, keyof never>();
the<{}, {[P in never]:P}>();
// the<never, number & never>(); // number? wth? wasn't this fixed in TS 2.5?
the<number, number | never>();

// unions
the<1|2, [1,2,3][0|1]>();
the<1|'a', ([1,2,3]|['a','b'])[0]>();
the<'a'|'b', keyof ({a:1}|{b:1})>();
the<{a:'a'}|{b:'b'}, {[P in 'a'|'b']:P}>();
the<(number & boolean) | (number & string), number & (boolean | string)>();
