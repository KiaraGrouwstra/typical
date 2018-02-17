import { tsst, the } from 'tsst-tycho';

describe(`built-in syntax`, () => {

  describe(`|`, () => {
    it(`the<1|2, 2>`, () => {
      tsst(() => {
        the<1|2, 2>();
      }).expectToCompile();
    });
  });

  describe(`&`, () => {
    it(`the<1, 1&2>`, () => {
      tsst(() => {
        the<1, 1&2>();
      }).expectToCompile();
    });
  });

  describe(`[]`, () => {
    it(`the<1, {a:1}['a']>`, () => {
      tsst(() => {
        the<1, {a:1}['a']>();
      }).expectToCompile();
    });
  });

  describe(`keyof`, () => {
    it(`the<'a'|'b', keyof { a: 1, b: 2 }>`, () => {
      tsst(() => {
        the<'a'|'b', keyof { a: 1, b: 2 }>();
      }).expectToCompile();
    });
  });

  describe(`in`, () => {
    it(`the<{ a: 'a' }, { [P in 'a']: P }>`, () => {
      tsst(() => {
        the<{ a: 'a' }, { [P in 'a']: P }>();
      }).expectToCompile();
    });
  });

  describe(`extends`, () => {
    it(`the<1, true extends boolean ? 1 : 0>`, () => {
      tsst(() => {
        the<1, true extends boolean ? 1 : 0>();
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
