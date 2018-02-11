import { tsst, the } from 'tsst-tycho';
import { Fn, Arguments } from './function';

describe(`function`, () => {

  describe(`Fn`, () => {

    it(`the<(v: number) => string, Fn<[number], string>>()`, () => {
      tsst(() => {
        the<(v: number) => string, Fn<[number], string>>();
      }).expectToCompile();
    });

  });

  describe(`Arguments`, () => {

    it(`the<[boolean, string], Arguments<(<S extends string>(a: boolean, s: S) => number)>>()`, () => {
      tsst(() => {
        the<[boolean, string], Arguments<(<S extends string>(a: boolean, s: S) => number)>>();
      }).expectToCompile();
    });

  });

});
