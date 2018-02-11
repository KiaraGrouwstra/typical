// @flow
import { tsst, the } from 'tsst-tycho';
import { Inc, Dec, Add, Subtract, Mult, Pow, DivFloor, Modulo } from './number';

describe(`number`, () => {

  describe(`Inc`, () => {

    it(`the<2, Inc[1]>()`, () => {
      tsst(() => {
        the<2, Inc[1]>();
      }).expectToCompile();
    });

  });

  describe(`Dec`, () => {

    it(`the<1, Dec[2]>()`, () => {
      tsst(() => {
        the<1, Dec[2]>();
      }).expectToCompile();
    });

  });

  describe(`Add`, () => {

    it(`the<5, Add<3, 2>>()`, () => {
      tsst(() => {
        the<5, Add<3, 2>>();
      }).expectToCompile();
    });

  });

  describe(`Subtract`, () => {

    it(`the<1, Subtract<3, 2>>()`, () => {
      tsst(() => {
        the<1, Subtract<3, 2>>();
      }).expectToCompile();
    });

  });

  describe(`Mult`, () => {

    it(`the<6, Mult<3, 2>>()`, () => {
      tsst(() => {
        the<6, Mult<3, 2>>();
      }).expectToCompile();
    });

  });

  describe(`Pow`, () => {

    it(`the<9, Pow<3, 2>>()`, () => {
      tsst(() => {
        the<9, Pow<3, 2>>();
      }).expectToCompile();
    });

    it(`the<8, Pow<2, 3>>()`, () => {
      tsst(() => {
        the<8, Pow<2, 3>>();
      }).expectToCompile();
    });

  });

  describe(`DivFloor`, () => {

    it(`the<2, DivFloor<5, 2>>()`, () => {
      tsst(() => {
        the<2, DivFloor<5, 2>>();
      }).expectToCompile();
    });

  });

  describe(`Modulo`, () => {

    it(`the<1, Modulo<5, 2>>()`, () => {
      tsst(() => {
        the<1, Modulo<5, 2>>();
      }).expectToCompile();
    });

  });

});
