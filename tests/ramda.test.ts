import { tsst, the } from 'tsst-tycho';
import { PathFn, PathOrFn, MergeAllFn, FromPairsFn, ZipObjectFn } from './ramda'; //, MapFn

declare function path<T extends { [k: string]: any }, R extends Array<string>>(obj: T, path: R): PathFn<T, R>;

describe(`ramda`, () => {

  describe(`PathFn`, () => {

    it(`the<'e', PathFn<{ a: { b: ['c', { d: 'e' }] } }, ['a', 'b', '1', 'd']>>()`, () => {
      tsst(() => {
        the<'e', PathFn<{ a: { b: ['c', { d: 'e' }] } }, ['a', 'b', '1', 'd']>>();
      }).expectToCompile();
    });

    it(`path`, () => {
      tsst(() => {
        let obj: { a: { b: ['c', { d: 'e' }] } } = { a: { b: ['c', { d: 'e' }] } };
        let keys: ['a', 'b', '1', 'd'] = ['a', 'b', '1', 'd'];
        const pathTest: 'e' = path(obj, keys);
      }).expectToCompile();
    });

  });

  describe(`PathOrFn`, () => {

    it(`the<'e', PathOrFn<{ a: { b: ['c', { d: 'e' }] } }, "oh", ['a', 'b', 1, 'd']>>()`, () => {
      tsst(() => {
        the<'e', PathOrFn<{ a: { b: ['c', { d: 'e' }] } }, "oh", ['a', 'b', 1, 'd']>>();
        // ^ error: 'oh'
        // ^ regression in recent TS?
      }).expectToCompile();
    });

    it(`the<'oh', PathOrFn<{ a: { b: ['c', { d: 'e' }] } }, "oh", ['a', 'b', 4]>>()`, () => {
      tsst(() => {
        the<'oh', PathOrFn<{ a: { b: ['c', { d: 'e' }] } }, "oh", ['a', 'b', 4]>>();
      }).expectToCompile();
    });

  });

  describe(`MergeAllFn`, () => {

    it(`the<{ a: 1, b: 3, c: 4, d: 5 }, MergeAllFn<[{ a: 1, b: 2 }, { b: 3, c: 4 }, { d: 5 }]>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 3, c: 4, d: 5 }, MergeAllFn<[{ a: 1, b: 2 }, { b: 3, c: 4 }, { d: 5 }]>>();
      }).expectToCompile();
    });

  });


  describe(`FromPairsFn`, () => {

    it(`the<{ a: 5, b: 2, c: 3 }, FromPairsFn<[['a', 1], ['b', 2], ['c', 3], ['a', 5]]>>()`, () => {
      tsst(() => {
        the<{ a: 5, b: 2, c: 3 }, FromPairsFn<[['a', 1], ['b', 2], ['c', 3], ['a', 5]]>>();
      }).expectToCompile();
    });

  });

  describe(`ZipObjectFn`, () => {

    it(`the<{ a: 1, b: 2, c: 3 }, ZipObjectFn<['a', 'b', 'c'], [1, 2, 3]>>()`, () => {
      tsst(() => {
        the<{ a: 1, b: 2, c: 3 }, ZipObjectFn<['a', 'b', 'c'], [1, 2, 3]>>();
      }).expectToCompile();
    });

  });

  describe(`#12838`, () => {

    declare function inc(n: number): number; // +1
    declare function identity<T>(a: T): T;
    declare function compose<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1;
    declare function compose<V0, T1, T2>(fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T2;
    declare function pipe   <V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1;                           // arity 1: same as compose
    declare function pipe   <V0, T1, T2>(fn0: (x: V0) => T1, fn1: (x: T1) => T2): (x: V0) => T2;     // arity 2: params swapped
  
    it(`identity`, () => {
      tsst(() => {
        let a: string = identity(0);
      }).expectToFailWith(`not assignable to type 'string'`);
    });

    // don't use generics if it can't resolve them right away:

    it(`compose + generics`, () => {
      tsst(() => {
        let a: string = compose(identity)(0); // generics lost, now {} => {}
      }).expectToFailWith(`not assignable to type 'string'`);
    });

    it(`pipe + generics`, () => {
      tsst(() => {
        let a: string = pipe   (identity)(0); // ditto
      }).expectToFailWith(`not assignable to type 'string'`);
    });

    // argument order apparently matters too:

    it(`compose + generics: concrete type first`, () => {
      tsst(() => {
        let a: string = compose(identity, inc)(0); // nope, number => {}
      }).expectToFailWith(`not assignable to type 'string'`);
    });

    it(`pipe + generics: concrete type first`, () => {
      tsst(() => {
        let a: string = pipe   (inc, identity)(0); // ok, number -> number
      }).expectToFailWith(`not assignable to type 'string'`);
    });

    // also no reasoning backward:

    it(`compose + generics: concrete type last`, () => {
      tsst(() => {
        let a: string = compose(inc, identity)(0); // {} => number
      }).expectToFailWith(`not assignable to type 'string'`);
    });

    it(`pipe + generics: concrete type last`, () => {
      tsst(() => {
        let a: string = pipe   (identity, inc)(0); // {} => number
      }).expectToFailWith(`not assignable to type 'string'`);
    });

  });

  // describe(``, () => {

  //   it(``, () => {
  //     tsst(() => {
  //       the<, <>();
  //     }).expectToCompile();
  //   });

  // });

});
