import { the, Obj } from './util';
import { KeyedSafe, Keyed, ObjectHasKey, HasKey, ObjectHasKeySafe, ObjProp, Omit, Overwrite,
IntersectionObjectKeys, IntersectionObjects, ObjectValsToUnion, ObjectHasStringIndex, Simplify } from './object';
import { Diff } from './union';
import { NumArr } from './fixtures';

the<{a:'a',b:'b'}, Keyed<{a:1,b:2}>>();

the<{a:'a',b:'b'} & Obj<never>, KeyedSafe<{a:1} & {b:2}>>();

the<'1', ObjectHasKey<{a:1}, 'a'>>();
the<'0', ObjectHasKey<{a:1}, 'b'>>();
the<'0'|'1', ObjectHasKey<{a?:1}, 'a'>>();
// the<'1', ObjectHasKey<NumArr, 1>>();
// the<'0', ObjectHasKey<NumArr, -1>>();

the<'0', HasKey<any[], 2>>();
the<'1', HasKey<NumArr, 2>>();
// ^ error: 0
the<'0', HasKey<NumArr, 5>>();
the<'1', HasKey<{ a: 1 }, 'a'>>();
// ^ error: 0
the<'0', HasKey<{ a: 1 }, 'b'>>();

the<'1', ObjectHasKeySafe<{ a: 1 }, 'a'>>();
the<'0', ObjectHasKeySafe<{ a: 1 }, 'b'>>();
the<'1', ObjectHasKeySafe<{ a: 1 }, 'a' | 'b'>>();
the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a'>>();
the<'0', ObjectHasKeySafe<{ a: 1, toString(): string }, 'b'>>();
// error: 1 :(
the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a' | 'b'>>();
the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString'>>(); // what do I want?
the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a'>>();
the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'b'>>(); // what do I want?
the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a' | 'b'>>();
the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString'>>();
the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a'>>();
the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'b'>>();
the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a' | 'b'>>();

the<1, ObjProp<{ a: 1 }, 'a'>>();
the<never, ObjProp<{ a: 1 }, 'b'>>();
the<never, ObjProp<{ a: 1 }, 'toString'>>();
the<1, ObjProp<{ a: 1, toString(): string }, 'a'>>();
the<never, ObjProp<{ a: 1, toString(): string }, 'b'>>();
// error: any :(
the<() => string, ObjProp<{ a: 1, toString(): string }, 'toString'>>();

type Item1 = { a: string, b: number, c: boolean };
type Item2 = { a: number };

the<{ b: number, c: boolean }, Omit<Item1, "a">>();
type ItemA = { a: string, b: number, c: boolean, toString(): string };
type KeyedItem1 = keyof ItemA
// the<'b'|'c'|'toString', Diff<keyof ItemA, "a">>();
// ^ error: "a" | "b" | ("toString" & (() => string)) | "c"
the<{ b: number, c: boolean, toString(): string }, Omit<ItemA, "a">>();
// ^ gives { b: number; c: boolean; }
the<'b'|'c'|'toString', keyof Omit<ItemA, "a">>();
// ^ error: "b" | "c" | ("toString" & (() => string))
// ^ it actually lied about "toString" being gone; it's just no longer showing because its key is somehow no longer just a string?!
// type skjdfds = keyof Simplify<{ [P in ('a' | 'b') & ('b' | 'c')]: "1" }>
// "b" | ("a" & "b") | ("a" & "c") | ("b" & "c")

// export type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U;
// ^ no-dependency version by Anders, uses intersection
// export type Overwrite<T, U, Int = { [P in Diff<keyof T, keyof U>]: T[P] } & U> = Pick<Int, keyof Int>;
// ^ my attempt at cleaning out the intersection, somehow makes FromPairs/ZipObject fail
the<{ a: number, b: number, c: boolean }, Overwrite<Item1, Item2>>();
// keys optional in 2nd arg: works without `strictNullChecks`

type Obj1 = { a: 1, b: 2 };
type Obj2 = { b: 'X', c: 'Z' };

the<'b', IntersectionObjectKeys<Obj1, Obj2>>();

the<{ b: 2 }, IntersectionObjects<Obj1, Obj2>>();
the<{ b: 'X' }, IntersectionObjects<Obj2, Obj1>>();

the<1|2, ObjectValsToUnion<Obj1>>();

the<{ a: 1, b: 2}, Simplify<{ a: 1 } & { b: 2}>>();

// toString experimenting
type abc = { a: 1, b: 2, foo: () => string, toString: () => string }; // , toLocaleString: () => string
the<{ a: 1, foo: () => string, toString: () => string }, Omit<abc, "b">>();
the<{ a: 1, b: 2, foo: () => string }, Omit<abc, "toString">>();
the<abc, Simplify<abc & { "b": never }>>();
the<{ a: 1, b: any, foo: () => string, toString: () => string }, Simplify<abc & { "b": any }>>();
the<abc, Simplify<abc & { "toString": never }>>();
the<{ a: 1, b: 2, foo: () => string, toString: any }, Simplify<abc & { "toString": any }>>();
the<abc, Simplify<abc & { "foo": never }>>();
the<{ a: 1, b: 2, foo: any, toString: () => string }, Simplify<abc & { "foo": any }>>();
the<{ a: 1, b: never, foo: () => string, toString: () => string }, Overwrite<abc, { "b": never }>>();
the<{ a: 1, b: any, foo: () => string, toString: () => string }, Overwrite<abc, { "b": any }>>();
the<{ a: 1, b: 2, foo: () => string }, Overwrite<abc, { "toString": never }>>();
the<{ a: 1, b: 2, foo: () => string, toString: any }, Overwrite<abc, { "toString": any }>>();
the<{ a: 1, b: 2, foo: never, toString: () => string }, Overwrite<abc, { "foo": never }>>();
the<{ a: 1, b: 2, foo: any, toString: () => string }, Overwrite<abc, { "foo": any }>>();
the<abc, Simplify<abc & { "toString": never }>>();
the<NumArr, Omit<NumArr, "length">>();

// https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-307871458
// type sfsd = { [P in PrototypeMethods]: P;　[k: string]: never; };
// type sdkjdsl = { toString: "toString"; [P in keyof "a"]: never };
// type sdkjds2l = { [P in keyof U]: never; [K in keyof PrototypeMethods]: K; };
