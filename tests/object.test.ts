import { tsst, the } from 'tsst-tycho';
import { Obj, List } from '../src/util';
import { KeyedSafe, Keyed, ObjectHasKey, HasKey, ObjectHasKeySafe, ObjectProp, Omit, Overwrite, IntersectValueOf,
IntersectionObjectKeys, IntersectionObjects, ObjectValsToUnion, ObjectHasStringIndex, Simplify, Swap, Jsonified,
DeepPartial, DeepReadonly, FunctionPropNames, FunctionProps, NonFunctionPropNames, NonFunctionProps,
MatchingPropNames, MatchingProps, NonMatchingPropNames, NonMatchingProps, StripIndex,
OptionalPropNames, OptionalProps, RequiredPropNames, RequiredProps, Spread, DeepWiden, DeepAssert,
ObjectHasNumberIndex, ObjectHasElem, ObjectNumberKeys, LiteralPropNames, LiteralProps, DeepRequired, Mutable,
DeepMutable } from '../src/object';
import { NumArr, Part } from './fixtures';

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

    it(`the<{a:'a',b:'b'}, Keyed<{a:1,b:2}>>`, () => {
      tsst(() => {
        the<{a:'a',b:'b'}, Keyed<{a:1,b:2}>>();
      }).expectToCompile();
    });

  });

  describe(`KeyedSafe`, () => {

    it(`the<{a:'a',b:'b'} & Obj<never>, KeyedSafe<{a:1} & {b:2}>>`, () => {
      tsst(() => {
        the<{a:'a',b:'b'} & Obj<never>, KeyedSafe<{a:1} & {b:2}>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectHasKey`, () => {

    it(`the<'1', ObjectHasKey<{a:1}, 'a'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKey<{a:1}, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKey<{a:1}, 'b'>>`, () => {
      tsst(() => {
        the<'0', ObjectHasKey<{a:1}, 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0'|'1', ObjectHasKey<{a?:1}, 'a'>>`, () => {
      tsst(() => {
        the<'0'|'1', ObjectHasKey<{a?:1}, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKey<NumArr, 1>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKey<NumArr, 1>>();
      }).expectToFail();
    });

    it(`the<'0', ObjectHasKey<NumArr, -1>>`, () => {
      tsst(() => {
        the<'0', ObjectHasKey<NumArr, -1>>();
      }).expectToFail();
    });

    it(`the<'0', ObjectHasKey<{ a: 1 }, "toString">>`, () => {
      tsst(() => {
        the<'0', ObjectHasKey<{ a: 1 }, "toString">>();
      }).expectToCompile();
    });
    // ^ error: () => string

  });

  describe(`HasKey`, () => {

    it(`the<'0', HasKey<any[], 2>>`, () => {
      tsst(() => {
        the<'0', HasKey<any[], 2>>();
      }).expectToCompile();
    });

    it(`the<'1', HasKey<NumArr, 2>>`, () => {
      tsst(() => {
        the<'1', HasKey<NumArr, 2>>();
      }).expectToCompile();
    });

    // ^ error: 0

    it(`the<'0', HasKey<NumArr, 5>>`, () => {
      tsst(() => {
        the<'0', HasKey<NumArr, 5>>();
      }).expectToCompile();
    });

    it(`the<'1', HasKey<{ a: 1 }, 'a'>>`, () => {
      tsst(() => {
        the<'1', HasKey<{ a: 1 }, 'a'>>();
      }).expectToCompile();
    });

    // ^ error: 0

    it(`the<'0', HasKey<{ a: 1 }, 'b'>>`, () => {
      tsst(() => {
        the<'0', HasKey<{ a: 1 }, 'b'>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectHasKeySafe`, () => {

    it(`the<'1', ObjectHasKeySafe<{ a: 1 }, 'a'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1 }, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKeySafe<{ a: 1 }, 'b'>>`, () => {
      tsst(() => {
        the<'0', ObjectHasKeySafe<{ a: 1 }, 'b'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1 }, 'a' | 'b'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1 }, 'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKeySafe<{ a: 1, toString(): string }, 'b'>>`, () => {
      tsst(() => {
        the<'0', ObjectHasKeySafe<{ a: 1, toString(): string }, 'b'>>();
      }).expectToCompile();
    });
    // error: 1 :(

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a' | 'b'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString'>>`, () => {
      tsst(() => {
        the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString'>>(); // what do I want?
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'b'>>`, () => {
      tsst(() => {
        the<'0', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'b'>>(); // what do I want?
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a' | 'b'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1 }, 'toString' | 'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'b'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a' | 'b'>>`, () => {
      tsst(() => {
        the<'1', ObjectHasKeySafe<{ a: 1, toString(): string }, 'toString' | 'a' | 'b'>>();
      }).expectToCompile();
    });

  });

  // if this works, I may need to replace string member access with this in other places...
  describe(`ObjectProp`, () => {

    it(`the<1, ObjectProp<{ a: 1 }, 'a'>>`, () => {
      tsst(() => {
        the<1, ObjectProp<{ a: 1 }, 'a'>>();
      }).expectToCompile();
    });

    it(`the<never, ObjectProp<{ a: 1 }, 'b'>>`, () => {
      tsst(() => {
        the<never, ObjectProp<{ a: 1 }, 'b'>>();
      }).expectToCompile();
    });

    it(`the<never, ObjectProp<{ a: 1 }, 'toString'>>`, () => {
      tsst(() => {
        the<never, ObjectProp<{ a: 1 }, 'toString'>>();
      }).expectToCompile();
    });

    it(`the<1, ObjectProp<{ a: 1, toString(): string }, 'a'>>`, () => {
      tsst(() => {
        the<1, ObjectProp<{ a: 1, toString(): string }, 'a'>>();
      }).expectToCompile();
    });

    it(`the<never, ObjectProp<{ a: 1, toString(): string }, 'b'>>`, () => {
      tsst(() => {
        the<never, ObjectProp<{ a: 1, toString(): string }, 'b'>>();
      }).expectToCompile();
    });
    // error: any :(

    it(`the<() => string, ObjectProp<{ a: 1, toString(): string }, 'toString'>>`, () => {
      tsst(() => {
        the<() => string, ObjectProp<{ a: 1, toString(): string }, 'toString'>>();
      }).expectToCompile();
    });

  });

  describe(`Omit`, () => {

    it(`the<{ b: number, c: boolean }, Omit<Item1, "a">>`, () => {
      tsst(() => {
        the<{ b: number, c: boolean }, Omit<Item1, "a">>();
      }).expectToCompile();
    });


    it(`the<'b'|'c'|'toString', Exclude<keyof ItemA, "a">>`, () => {
      tsst(() => {
        type KeyedItem1 = keyof ItemA
        the<'b'|'c'|'toString', Exclude<keyof ItemA, "a">>();
      }).expectToCompile();
    });

    it(`the<{ b: number, c: boolean, toString(): string }, Omit<ItemA, "a">>`, () => {
      tsst(() => {
        the<{ b: number, c: boolean, toString(): string }, Omit<ItemA, "a">>();
      }).expectToCompile();
    });

  });

  describe(`Overwrite`, () => {

    it(`the<{ a: number, b: number, c: boolean }, Overwrite<Item1, Item2>>`, () => {
      tsst(() => {
        the<{ a: number, b: number, c: boolean }, Overwrite<Item1, Item2>>();
      }).expectToCompile();
    });
    // keys optional in 2nd arg: works without `strictNullChecks`

  });

  describe(`IntersectionObjectKeys`, () => {

    it(`the<'b', IntersectionObjectKeys<Obj1, Obj2>>`, () => {
      tsst(() => {
        the<'b', IntersectionObjectKeys<Obj1, Obj2>>();
      }).expectToCompile();
    });

  });

  describe(`IntersectionObjects`, () => {

    it(`the<{ b: 2 }, IntersectionObjects<Obj1, Obj2>>`, () => {
      tsst(() => {
        the<{ b: 2 }, IntersectionObjects<Obj1, Obj2>>();
      }).expectToCompile();
    });

    it(`the<{ b: 'X' }, IntersectionObjects<Obj2, Obj1>>`, () => {
      tsst(() => {
        the<{ b: 'X' }, IntersectionObjects<Obj2, Obj1>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectValsToUnion`, () => {

    it(`the<1|2, ObjectValsToUnion<Obj1>>`, () => {
      tsst(() => {
        the<1|2, ObjectValsToUnion<Obj1>>();
      }).expectToCompile();
    });

  });

  describe(`Simplify`, () => {

    it(`the<{ a: 1, b: 2}, Simplify<{ a: 1 } & { b: 2}>>`, () => {
      tsst(() => {
        the<{ a: 1, b: 2}, Simplify<{ a: 1 } & { b: 2}>>();
      }).expectToCompile();
    });

  });

  describe(`Swap`, () => {

    it(`the<{ b: 'a', d: 'c' }, Swap<{ a: 'b', c: 'd' }>>`, () => {
      tsst(() => {
        the<{ b: 'a', d: 'c' }, Swap<{ a: 'b', c: 'd' }>>();
      }).expectToCompile();
    });

  });

  describe(`toString experimenting`, () => {

    it(`the<{ a: 1, foo: () => string, toString: () => string }, Omit<abc, "b">>`, () => {
      tsst(() => {
        the<{ a: 1, foo: () => string, toString: () => string }, Omit<abc, "b">>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: () => string }, Omit<abc, "toString">>`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: () => string }, Omit<abc, "toString">>();
      }).expectToCompile();
    });

    it(`the<abc, Simplify<abc & { "b": never }>>`, () => {
      tsst(() => {
        the<abc, Simplify<abc & { "b": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: any, foo: () => string, toString: () => string }, Simplify<abc & { "b": any }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: any, foo: () => string, toString: () => string }, Simplify<abc & { "b": any }>>();
      }).expectToCompile();
    });

    it(`the<abc, Simplify<abc & { "toString": never }>>`, () => {
      tsst(() => {
        the<abc, Simplify<abc & { "toString": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: () => string, toString: any }, Simplify<abc & { "toString": any }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: () => string, toString: any }, Simplify<abc & { "toString": any }>>();
      }).expectToCompile();
    });

    it(`the<abc, Simplify<abc & { "foo": never }>>`, () => {
      tsst(() => {
        the<abc, Simplify<abc & { "foo": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: any, toString: () => string }, Simplify<abc & { "foo": any }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: any, toString: () => string }, Simplify<abc & { "foo": any }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: never, foo: () => string, toString: () => string }, Overwrite<abc, { "b": never }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: never, foo: () => string, toString: () => string }, Overwrite<abc, { "b": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: any, foo: () => string, toString: () => string }, Overwrite<abc, { "b": any }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: any, foo: () => string, toString: () => string }, Overwrite<abc, { "b": any }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: () => string }, Overwrite<abc, { "toString": never }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: () => string }, Overwrite<abc, { "toString": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: () => string, toString: any }, Overwrite<abc, { "toString": any }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: () => string, toString: any }, Overwrite<abc, { "toString": any }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: never, toString: () => string }, Overwrite<abc, { "foo": never }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: never, toString: () => string }, Overwrite<abc, { "foo": never }>>();
      }).expectToCompile();
    });

    it(`the<{ a: 1, b: 2, foo: any, toString: () => string }, Overwrite<abc, { "foo": any }>>`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, foo: any, toString: () => string }, Overwrite<abc, { "foo": any }>>();
      }).expectToCompile();
    });

    it(`the<abc, Simplify<abc & { "toString": never }>>`, () => {
      tsst(() => {
        the<abc, Simplify<abc & { "toString": never }>>();
      }).expectToCompile();
    });

    it(`the<'1', ObjectHasStringIndex<{ [k: string]: 123 }>>`, () => {
      tsst(() => {
        the<'1', ObjectHasStringIndex<{ [k: string]: 123 }>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasStringIndex<{ a: 123 }>>`, () => {
      tsst(() => {
        the<'0', ObjectHasStringIndex<{ a: 123 }>>();
      }).expectToCompile();
    });

  });

  describe(`StripIndex`, () => {

    it(`the<StripIndex<{ a: 1, [k: string]: number }>, { a: 1 }>`, () => {
      tsst(() => {
        the<StripIndex<{ a: 1, [k: string]: number }>, { a: 1 }>();
      }).expectToCompile();
    });

  });

  describe(`Jsonified`, () => {

    it(`the<{ b: 'a' }, Jsonified<{ b: 'a', d: undefined, f: () => void }>>`, () => {
      tsst(() => {
        the<{ b: 'a' }, Jsonified<{ b: 'a', d: undefined, f: () => void }>>();
      }).expectToCompile();
    });

  });

  describe(`IntersectValueOf`, () => {

    it(`IntersectValueOf`, () => {
      tsst(() => {
        type Thing = {
          foo: {a: string},
          bar: {b: number},
          baz: {c: boolean}
        }
        type Everything = IntersectValueOf<Thing>;
        the<string, Everything['a']>();
        the<string, Everything['b']>();
        the<string, Everything['c']>();
      }).expectToCompile();
    });

  });

  describe(`DeepWiden`, () => {
      
    it(`the<{ a: number }, DeepWiden<{ a: 1 }>>`, () => {
      tsst(() => {
        the<{ a: number }, DeepWiden<{ a: 1 }>>();
      }).expectToCompile();
    });

  });

  describe(`DeepPartial`, () => {
      
    it(`the<{ a?: { b?: 1 } }, DeepPartial<{ a: { b: 1 } }>>`, () => {
      tsst(() => {
        the<{ a?: { b?: 1 } }, DeepPartial<{ a: { b: 1 } }>>();
      }).expectToCompile();
    });

    it(`the<1, DeepPartial<{ a: [{ b: 1 }] }>['a'][0]['b']>`, () => {
      tsst(() => {
        let o: DeepPartial<{ a: [{ b: 1 }] }> = null! as DeepPartial<{ a: [{ b: 1 }] }>;
        if (typeof o.a === 'undefined') {} else {
          let b = o.a[0].b;
          if (typeof b === 'number') {
            let c: 1 = b;
          } else {
            let c: undefined = b;
          }
        }
      }).expectToCompile();
    });

  });

  describe(`DeepRequired`, () => {
      
    it(`the<{ a: { b: 1 } }, DeepRequired<{ a?: { b?: 1 } }>>`, () => {
      tsst(() => {
        the<{ a: { b: 1 } }, DeepRequired<{ a?: { b?: 1 } }>>();
      }).expectToCompile();
    });

  });

  describe(`Mutable`, () => {
      
    it(`the<{ a: 1 }, Mutable<{ readonly a: 1 }>>`, () => {
      tsst(() => {
        the<{ a: 1 }, Mutable<{ readonly a: 1 }>>();
      }).expectToCompile();
    });

  });

  describe(`DeepMutable`, () => {
      
    it(`the<{ a: { b: 1 } }, DeepMutable<{ readonly a: { readonly b: 1 } }>>`, () => {
      tsst(() => {
        the<{ a: { b: 1 } }, DeepMutable<{ readonly a: { readonly b: 1 } }>>();
      }).expectToCompile();
    });

  });

  describe(`DeepAssert`, () => {
      
    it(`the<{ a: 1 }, DeepAssert<{ a: 1|null }>>`, () => {
      tsst(() => {
        the<{ a: 1 }, DeepAssert<{ a: 1|null }>>();
      }).expectToCompile();
    });

  });

  describe(`DeepReadonly`, () => {

    it(`still allows reading`, () => {
      tsst(() => {
        function f10(part: DeepReadonly<Part>) {
          let name: string = part.name;
          let id: number = part.subparts[0].id;
        }
      }).expectToCompile();
    });

    it(`disallows writing - layer 0`, () => {
      tsst(() => {
        function f10(part: DeepReadonly<Part>) {
          part.id = part.id;
        }
      }).expectToFailWith('read-only');
    });

    it(`disallows writing - layer 1`, () => {
      tsst(() => {
        function f10(part: DeepReadonly<Part>) {
          part.subparts[0] = part.subparts[0];
        }
      }).expectToFailWith('only permits reading');
    });

    it(`disallows writing - layer 2`, () => {
      tsst(() => {
        function f10(part: DeepReadonly<Part>) {
          part.subparts[0].id = part.subparts[0].id;
        }
      }).expectToFailWith('read-only');
    });

    it(`strips out methods`, () => {
      tsst(() => {
        function f10(part: DeepReadonly<Part>) {
          part.updatePart("hello");
        }
      }).expectToFailWith('does not exist');
    });

  });

  describe(`LiteralPropNames`, () => {
    
    it(`the<'a', LiteralPropNames<{ a: 1, [k: string]: number }>>`, () => {
      tsst(() => {
        the<'a', LiteralPropNames<{ a: 1, [k: string]: number }>>();
      }).expectToCompile();
    });

  });

  describe(`LiteralProps`, () => {
      
    it(`the<{ a: 1 }, LiteralProps<{ a: 1, [k: string]: number }>>`, () => {
      tsst(() => {
        the<{ a: 1 }, LiteralProps<{ a: 1, [k: string]: number }>>();
      }).expectToCompile();
    });

  });

  describe(`FunctionPropNames`, () => {
    
    it(`the<'f', FunctionPropNames<{ a: 1, f: () => void }>>`, () => {
      tsst(() => {
        the<'f', FunctionPropNames<{ a: 1, f: () => void }>>();
      }).expectToCompile();
    });

  });

  describe(`FunctionProps`, () => {
      
    it(`the<{ f: () => void }, FunctionProps<{ a: 1, f: () => void }>>`, () => {
      tsst(() => {
        the<{ f: () => void }, FunctionProps<{ a: 1, f: () => void }>>();
      }).expectToCompile();
    });

  });

  describe(`NonFunctionPropNames`, () => {
      
    it(`the<'a', NonFunctionPropNames<{ a: 1, f: () => void }>>`, () => {
      tsst(() => {
        the<'a', NonFunctionPropNames<{ a: 1, f: () => void }>>();
      }).expectToCompile();
    });

  });

  describe(`NonFunctionProps`, () => {
      
    it(`the<{ a: 1 }, NonFunctionProps<{ a: 1, f: () => void }>>`, () => {
      tsst(() => {
        the<{ a: 1 }, NonFunctionProps<{ a: 1, f: () => void }>>();
      }).expectToCompile();
    });

  });

  describe(`MatchingPropNames`, () => {
      
    it(`the<'f', MatchingPropNames<{ a: 1, f: true }, boolean>>`, () => {
      tsst(() => {
        the<'f', MatchingPropNames<{ a: 1, f: true }, boolean>>();
      }).expectToCompile();
    });

  });

  describe(`MatchingProps`, () => {
      
    it(`the<{ f: true }, MatchingProps<{ a: 1, f: true }, boolean>>`, () => {
      tsst(() => {
        the<{ f: true }, MatchingProps<{ a: 1, f: true }, boolean>>();
      }).expectToCompile();
    });

  });

  describe(`NonMatchingPropNames`, () => {
      
    it(`the<'a', NonMatchingPropNames<{ a: 1, f: true }, boolean>>`, () => {
      tsst(() => {
        the<'a', NonMatchingPropNames<{ a: 1, f: true }, boolean>>();
      }).expectToCompile();
    });

  });

  describe(`NonMatchingProps`, () => {
      
    it(`the<{ a: 1 }, NonMatchingProps<{ a: 1, f: true }, boolean>>`, () => {
      tsst(() => {
        the<{ a: 1 }, NonMatchingProps<{ a: 1, f: true }, boolean>>();
      }).expectToCompile();
    });

  });

  describe(`OptionalPropNames`, () => {
      
    it(`the<'a', OptionalPropNames<{ a?: 1, b: 2 }>>`, () => {
      tsst(() => {
        the<'a', OptionalPropNames<{ a?: 1, b: 2 }>>();
      }).expectToCompile();
    });

  });

  describe(`OptionalProps`, () => {
      
    it(`the<{ a?: 1 }, OptionalProps<{ a?: 1, b: 2 }>>`, () => {
      tsst(() => {
        the<{ a?: 1 }, OptionalProps<{ a?: 1, b: 2 }>>();
      }).expectToCompile();
    });

  });

  describe(`RequiredPropNames`, () => {
      
    it(`the<'b', RequiredPropNames<{ a?: 1, b: 2 }>>`, () => {
      tsst(() => {
        the<'b', RequiredPropNames<{ a?: 1, b: 2 }>>();
      }).expectToCompile();
    });

  });

  describe(`RequiredProps`, () => {
      
    it(`the<{ b: 2 }, RequiredProps<{ a?: 1, b: 2 }>>`, () => {
      tsst(() => {
        the<{ b: 2 }, RequiredProps<{ a?: 1, b: 2 }>>();
      }).expectToCompile();
    });

  });

  describe(`Spread`, () => {
      
    it(`the<{ a: number, b: number, c: boolean }, Spread<Item1, Item2>>`, () => {
      tsst(() => {
        the<{ a: number, b: number, c: boolean }, Spread<Item1, Item2>>();
      }).expectToCompile();
    });
    // keys optional in 2nd arg: works without `strictNullChecks`
      
    it(`the<AB, Spread<A, B>>`, () => {
      tsst(() => {
        type A = {
          a: boolean;
          b: number;
          c: string;
        };
        type B = {
          b: number[];
          c: string[] | undefined;
          d: string;
          e: number | undefined;
        };
        type AB = {
            a: boolean;
            b: number[];
            c: string | string[];
            d: string;
            e: number | undefined;
        };
        the<AB, Spread<A, B>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectHasNumberIndex`, () => {
      
    it(`the<'0', ObjectHasNumberIndex<{ 0: 'a' }>>`, () => {
      tsst(() => {
        the<'0', ObjectHasNumberIndex<{ 0: 'a' }>>();
      }).expectToCompile();
    });
      
    it(`the<'0', ObjectHasNumberIndex<['a']>>`, () => {
      tsst(() => {
        the<'0', ObjectHasNumberIndex<['a']>>();
      }).expectToCompile();
    });
      
    it(`the<'1', ObjectHasNumberIndex<{ [i: number]: 'a' }>>`, () => {
      tsst(() => {
        the<'1', ObjectHasNumberIndex<{ [i: number]: 'a' }>>();
      }).expectToCompile();
    });
      
    it(`the<'1', ObjectHasNumberIndex<'a'[]>>`, () => {
      tsst(() => {
        the<'1', ObjectHasNumberIndex<'a'[]>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectHasElem`, () => {
      
    it(`the<'1', ObjectHasElem<{ a: 1 }, 1>>`, () => {
      tsst(() => {
        the<'1', ObjectHasElem<{ a: 1 }, 1>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasElem<{ a: 1 }, 0>>`, () => {
      tsst(() => {
        the<'0', ObjectHasElem<{ a: 1 }, 0>>();
      }).expectToCompile();
    });

  });

  describe(`ObjectNumberKeys`, () => {
      
    it(`the<'0'|'1', ObjectNumberKeys<['a','b']>>`, () => {
      tsst(() => {
        the<'0'|'1', ObjectNumberKeys<['a','b']>>();
      }).expectToCompile();
    });
      
    it(`the<'0'|'1', ObjectNumberKeys<{0:'a',1:'b',length:2}>>`, () => {
      tsst(() => {
        the<'0'|'1', ObjectNumberKeys<{0:'a',1:'b',length:2}>>();
      }).expectToCompile();
    });

  });

  // describe(``, () => {
      
  //   it(``, () => {
  //     tsst(() => {
  //       the<>();
  //     }).expectToCompile();
  //   });

  // });

});
