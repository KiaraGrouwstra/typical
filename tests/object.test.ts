import { tsst, the } from 'tsst';
import { Obj } from './util';
import { KeyedSafe, Keyed, ObjectHasKey, HasKey, ObjectHasKeySafe, ObjProp, Omit, Overwrite,
IntersectionObjectKeys, IntersectionObjects, ObjectValsToUnion, ObjectHasStringIndex, Simplify } from './object';
import { Diff } from './union';
import { NumArr } from './fixtures';

type Item1 = { a: string, b: number, c: boolean };
type Item2 = { a: number };
type ItemA = { a: string, b: number, c: boolean, toString(): string };

type Obj1 = { a: 1, b: 2 };
type Obj2 = { b: 'X', c: 'Z' };

type abc = { a: 1, b: 2, foo: () => string, toString: () => string }; // , toLocaleString: () => string
// https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-307871458
// type sfsd = { [P in PrototypeMethods]: P;　[k: string]: never; };
// type sdkjdsl = { toString: "toString"; [P in keyof "a"]: never };
// type sdkjds2l = { [P in keyof U]: never; [K in keyof PrototypeMethods]: K; };

describe(`object`, () => {

  describe(`Keyed`, () => {

    it(`the<{a:'a',b:'b'}, Keyed<{a:1,b:2}>>()`, () => {
      tsst(() => {
        the<{a:'a',b:'b'}, Keyed<{a:1,b:2}>>();
      }).expectToCompile();
    });

  });

  describe(`KeyedSafe`, () => {

    it(`the<{a:'a',b:'b'} & Obj<never>, KeyedSafe<{a:1} & {b:2}>>()`, () => {
      tsst(() => {
        the<{a:'a',b:'b'} & Obj<never>, KeyedSafe<{a:1} & {b:2}>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectHasKey`, () => {

    it(`the<'1', ObjectHasKey<{a:1}, 'a'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKey<{a:1}, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKey<{a:1}, 'b'>>()`, () => {
      tsst(() => {
        the<'0', ObjectHasKey<{a:1}, 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0'|'1', ObjectHasKey<{a?:1}, 'a'>>()`, () => {
      tsst(() => {
        the<'0'|'1', ObjectHasKey<{a?:1}, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKey<NumArr, 1>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKey<NumArr, 1>>();
      }).expectToFail();
    });

    it(`the<'0', ObjectHasKey<NumArr, -1>>()`, () => {
      tsst(() => {
        the<'0', ObjectHasKey<NumArr, -1>>();
      }).expectToFail();
    });

  });

  describe(`HasKey`, () => {

    it(`the<'0', HasKey<any[], 2>>()`, () => {
      tsst(() => {
        the<'0', HasKey<any[], 2>>();
      }).expectToCompile();
    });

    it(`the<'1', HasKey<NumArr, 2>>()`, () => {
      tsst(() => {
        the<'1', HasKey<NumArr, 2>>();
      }).expectToCompile();
    });

    // ^ error: 0

    it(`the<'0', HasKey<NumArr, 5>>()`, () => {
      tsst(() => {
        the<'0', HasKey<NumArr, 5>>();
      }).expectToCompile();
    });

    it(`the<'1', HasKey<{ a: 1 }, 'a'>>()`, () => {
      tsst(() => {
        the<'1', HasKey<{ a: 1 }, 'a'>>();
      }).expectToCompile();
    });

    // ^ error: 0

    it(`the<'0', HasKey<{ a: 1 }, 'b'>>()`, () => {
      tsst(() => {
        the<'0', HasKey<{ a: 1 }, 'b'>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectHasKeySafe`, () => {

    it(`the<'1', ObjectHasKeySafe<{ a: 1 }, 'a'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1 }, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKeySafe<{ a: 1 }, 'b'>>()`, () => {
      tsst(() => {
        the<'0', ObjectHasKeySafe<{ a: 1 }, 'b'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1 }, 'a' | 'b'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1 }, 'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKeySafe<{ a: 1, toString(): string }, 'b'>>()`, () => {
      tsst(() => {
        the<'0', ObjectHasKeySafe<{ a: 1, toString(): string }, 'b'>>();
      }).expectToCompile();
    });
    // error: 1 :(

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a' | 'b'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString'>>()`, () => {
      tsst(() => {
        the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString'>>(); // what do I want?
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'b'>>()`, () => {
      tsst(() => {
        the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'b'>>(); // what do I want?
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a' | 'b'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'b'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a' | 'b'>>()`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a' | 'b'>>();
      }).expectToCompile();
    });

  });

  describe(`ObjProp`, () => {

    it(`the<1, ObjProp<{ a: 1 }, 'a'>>()`, () => {
      tsst(() => {
        the<1, ObjProp<{ a: 1 }, 'a'>>();
      }).expectToCompile();
    });

    it(`the<never, ObjProp<{ a: 1 }, 'b'>>()`, () => {
      tsst(() => {
        the<never, ObjProp<{ a: 1 }, 'b'>>();
      }).expectToCompile();
    });

    it(`the<never, ObjProp<{ a: 1 }, 'toString'>>()`, () => {
      tsst(() => {
        the<never, ObjProp<{ a: 1 }, 'toString'>>();
      }).expectToCompile();
    });

    it(`the<1, ObjProp<{ a: 1, toString(): string }, 'a'>>()`, () => {
      tsst(() => {
        the<1, ObjProp<{ a: 1, toString(): string }, 'a'>>();
      }).expectToCompile();
    });

    it(`the<never, ObjProp<{ a: 1, toString(): string }, 'b'>>()`, () => {
      tsst(() => {
        the<never, ObjProp<{ a: 1, toString(): string }, 'b'>>();
      }).expectToCompile();
    });
    // error: any :(

    it(`the<() => string, ObjProp<{ a: 1, toString(): string }, 'toString'>>()`, () => {
      tsst(() => {
        the<() => string, ObjProp<{ a: 1, toString(): string }, 'toString'>>();
      }).expectToCompile();
    });

  });

  describe(`Omit`, () => {

    it(`the<{ b: number, c: boolean }, Omit<Item1, "a">>()`, () => {
      tsst(() => {
        the<{ b: number, c: boolean }, Omit<Item1, "a">>();
      }).expectToCompile();
    });


    it(`the<'b'|'c'|'toString', Diff<keyof ItemA, "a">>()`, () => {
      tsst(() => {
        type KeyedItem1 = keyof ItemA
        the<'b'|'c'|'toString', Diff<keyof ItemA, "a">>();
      }).expectToCompile();
    });
    // ^ error: "a" | "b" | ("toString" & (() => string)) | "c"

    it(`the<{ b: number, c: boolean, toString(): string }, Omit<ItemA, "a">>()`, () => {
      tsst(() => {
        the<{ b: number, c: boolean, toString(): string }, Omit<ItemA, "a">>();
      }).expectToCompile();
    });

  });

  describe(`Overwrite`, () => {

    it(`the<{ a: number, b: number, c: boolean }, Overwrite<Item1, Item2>>()`, () => {
      tsst(() => {
        the<{ a: number, b: number, c: boolean }, Overwrite<Item1, Item2>>();
      }).expectToCompile();
    });
    // keys optional in 2nd arg: works without `strictNullChecks`

  });

  describe(`IntersectionObjectKeys`, () => {

    it(`the<'b', IntersectionObjectKeys<Obj1, Obj2>>()`, () => {
      tsst(() => {
        the<'b', IntersectionObjectKeys<Obj1, Obj2>>();
      }).expectToCompile();
    });

  });

  describe(`IntersectionObjects`, () => {

    it(`the<{ b: 2 }, IntersectionObjects<Obj1, Obj2>>()`, () => {
      tsst(() => {
        the<{ b: 2 }, IntersectionObjects<Obj1, Obj2>>();
      }).expectToCompile();
    });

    it(`the<{ b: 'X' }, IntersectionObjects<Obj2, Obj1>>()`, () => {
      tsst(() => {
        the<{ b: 'X' }, IntersectionObjects<Obj2, Obj1>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectValsToUnion`, () => {

    it(`the<1|2, ObjectValsToUnion<Obj1>>()`, () => {
      tsst(() => {
        the<1|2, ObjectValsToUnion<Obj1>>();
      }).expectToCompile();
    });

  });

  describe(`Simplify`, () => {

    it(`the<{ a: 1, b: 2}, Simplify<{ a: 1 } & { b: 2}>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2}, Simplify<{ a: 1 } & { b: 2}>>();
      }).expectToCompile();
    });

  });

  describe(`toString experimenting`, () => {

    it(`the<{ a: 1, foo: () => string, toString: () => string }, Omit<abc, "b">>()`, () => {
      tsst(() => {
        the<{ a: 1, foo: () => string, toString: () => string }, Omit<abc, "b">>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: () => string }, Omit<abc, "toString">>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: () => string }, Omit<abc, "toString">>();
      }).expectToCompile();
    });

    it(`the<abc, Simplify<abc & { "b": never }>>()`, () => {
      tsst(() => {
        the<abc, Simplify<abc & { "b": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: any, foo: () => string, toString: () => string }, Simplify<abc & { "b": any }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: any, foo: () => string, toString: () => string }, Simplify<abc & { "b": any }>>();
      }).expectToCompile();
    });

    it(`the<abc, Simplify<abc & { "toString": never }>>()`, () => {
      tsst(() => {
        the<abc, Simplify<abc & { "toString": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: () => string, toString: any }, Simplify<abc & { "toString": any }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: () => string, toString: any }, Simplify<abc & { "toString": any }>>();
      }).expectToCompile();
    });

    it(`the<abc, Simplify<abc & { "foo": never }>>()`, () => {
      tsst(() => {
        the<abc, Simplify<abc & { "foo": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: any, toString: () => string }, Simplify<abc & { "foo": any }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: any, toString: () => string }, Simplify<abc & { "foo": any }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: never, foo: () => string, toString: () => string }, Overwrite<abc, { "b": never }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: never, foo: () => string, toString: () => string }, Overwrite<abc, { "b": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: any, foo: () => string, toString: () => string }, Overwrite<abc, { "b": any }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: any, foo: () => string, toString: () => string }, Overwrite<abc, { "b": any }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: () => string }, Overwrite<abc, { "toString": never }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: () => string }, Overwrite<abc, { "toString": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: () => string, toString: any }, Overwrite<abc, { "toString": any }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: () => string, toString: any }, Overwrite<abc, { "toString": any }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: never, toString: () => string }, Overwrite<abc, { "foo": never }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: never, toString: () => string }, Overwrite<abc, { "foo": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: any, toString: () => string }, Overwrite<abc, { "foo": any }>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: any, toString: () => string }, Overwrite<abc, { "foo": any }>>();
      }).expectToCompile();
    });

    it(`the<abc, Simplify<abc & { "toString": never }>>()`, () => {
      tsst(() => {
        the<abc, Simplify<abc & { "toString": never }>>();
      }).expectToCompile();
    });

  });

});
