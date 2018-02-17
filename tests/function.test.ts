import { tsst, the } from 'tsst-tycho';
import { Fn, Arguments, Argument } from '../src/function';

describe(`function`, () => {

  describe(`Fn`, () => {

    it(`the<(v: number) => string, Fn<[number], string>>`, () => {
      tsst(() => {
        the<(v: number) => string, Fn<[number], string>>();
      }).expectToCompile();
    });

  });

  describe(`Arguments`, () => {

    it(`the<[boolean, string], Arguments<(<S extends string>(a: boolean, s: S) => number)>>`, () => {
      tsst(() => {
        the<[boolean, string], Arguments<(<S extends string>(a: boolean, s: S) => number)>>();
      }).expectToCompile();
    });

  });

  describe(`Argument`, () => {

    it(`the<1, Argument<0, (a: 1, b: 2) => 8>>`, () => {
      tsst(() => {
        the<1, Argument<0, (a: 1, b: 2) => 8>>();
      }).expectToCompile();
    });

    it(`the<2, Argument<1, (a: 1, ...args: 2[]) => 8>>`, () => {
      tsst(() => {
        the<2, Argument<1, (a: 1, ...args: 2[]) => 8>>();
      }).expectToCompile();
    });

    it(`the<2, Argument<1, (a: 1, b: 2, ...args: 3[]) => 8>>`, () => {
      tsst(() => {
        the<2, Argument<1, (a: 1, b: 2, ...args: 3[]) => 8>>();
      }).expectToCompile();
    });

  });

  // describe(``, () => {

  //   it(``, () => {
  //     tsst(() => {
  //       the<, <>>();
  //     }).expectToCompile();
  //   });

  // });

});
