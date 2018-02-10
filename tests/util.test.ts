import { tsst, the } from 'tsst-tycho';
import { If, The, Intersection } from './util';

describe(`util`, () => {

  describe(`the`, () => {

    it(`works with matching types`, () => {
      tsst(() => {
        the<number, 123>();
      }).expectToCompile();
    });

    it(`fails with clashing types`, () => {
      tsst(() => {
        the<string, 123>();
      }).expectToFailWith('does not satisfy');
    });

    it(`protects from never when flipped`, () => {
      tsst(() => {
        the<never, string>();
      }).expectToFailWith('does not satisfy');
    });

    it(`protects from any`, () => {
      tsst(() => {
        the<string, any>();
      }).expectToFailWith('does not satisfy');
    });

  });

  describe(`If`, () => {

    it(`has then`, () => {
      tsst(() => {
        the<123, If<'1', 123, 456>>();
      }).expectToCompile();
    });

    it(`has else`, () => {
      tsst(() => {
        the<456, If<'0', 123, 456>>();
      }).expectToCompile();
    });

  });

  describe(`Intersection`, () => {

    it(`intersects`, () => {
      tsst(() => {
        the<1 & 'a', Intersection<1, 'a'>>();
      }).expectToCompile();
    });

  });

});
