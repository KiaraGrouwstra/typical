import { tsst, the } from 'tsst-tycho';
import { Bool } from './util';
import { Not, And, Or, Indeterminate, Determinate, DefinitelyYes, DefinitelyNo } from './boolean';
import { UnionHasKey } from './union';

describe(`boolean`, () => {

  describe(`Not`, () => {

    it(`Not<'0'> -> '1'`, () => {
      tsst(() => {
        the<'1', Not<'0'>>();
      }).expectToCompile();
    });

    it(`Not<'1'> -> '0'`, () => {
      tsst(() => {
        the<'0', Not<'1'>>();
      }).expectToCompile();
    });

    it(`Not<'2'> -> Bool`, () => {
      tsst(() => {
        the<Bool, Not<'2'>>();
      }).expectToCompile();
    });

    xit(`Not<'true'> -> '0'`, () => {
      tsst(() => {
        the<'0', Not<'true'>>();
      }).expectToCompile();
    });

    xit(`Not<'false'> -> '1'`, () => {
      tsst(() => {
        the<'1', Not<'false'>>();
      }).expectToCompile();
    });

    it(`Not<any> -> never`, () => {
      tsst(() => {
        the<never, Not<any>>();
      }).expectToCompile();
    });

    it(`Not<never> -> Bool`, () => {
      tsst(() => {
        the<Bool, Not<never>>(); // any
      }).expectToCompile();
    });

    it(`Not<true> -> '0'`, () => {
      tsst(() => {
        the<'0', Not<true>>(); // any
      }).expectToCompile();
    });

    it(`Not<false> -> '1'`, () => {
      tsst(() => {
        the<'1', Not<false>>(); // any
      }).expectToCompile();
    });

  });

  describe(`And`, () => {

    it(`And<'1', '1'> -> '1'`, () => {
      tsst(() => {
        the<'1', And<'1', '1'>>();
      }).expectToCompile();
    });

    it(`And<'0', '1'> -> '0'`, () => {
      tsst(() => {
        the<'0', And<'0', '1'>>();
      }).expectToCompile();
    });

  });

  describe(`Or`, () => {

    it(`Or<'1', '0'> -> '1'`, () => {
      tsst(() => {
        the<'1', Or<'1', '0'>>();
      }).expectToCompile();
    });

    it(`Or<'0', '0'> -> '0'`, () => {
      tsst(() => {
        the<'0', Or<'0', '0'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionHasKey`, () => {

    it(`UnionHasKey<Bool,'0'> -> '1'`, () => {
      tsst(() => {
        the<'1', UnionHasKey<Bool,'0'>>();
      }).expectToCompile();
    });

    it(`UnionHasKey<Bool,'1'> -> '1'`, () => {
      tsst(() => {
        the<'1', UnionHasKey<Bool,'1'>>();
      }).expectToCompile();
    });

    it(`UnionHasKey<Bool,'0'> | UnionHasKey<Bool,'1'> -> '1'`, () => {
      tsst(() => {
        the<'1', UnionHasKey<Bool,'0'> | UnionHasKey<Bool,'1'>>();
      }).expectToCompile();
    });

    it(`And<UnionHasKey<Bool,'0'>, UnionHasKey<Bool,'1'>> -> '1'`, () => {
      tsst(() => {
        the<'1', And<UnionHasKey<Bool,'0'>, UnionHasKey<Bool,'1'>>>();
      }).expectToCompile();
    });

  });

  describe(`Indeterminate`, () => {
    // ^ broke, along with dependents!
    // ^ regression in recent TS?

    it(`Indeterminate<Bool> -> '1'`, () => {
      tsst(() => {
        the<'1', Indeterminate<Bool>>();
      }).expectToCompile();
    });

    it(`Indeterminate<'0'> -> '0'`, () => {
      tsst(() => {
        the<'0', Indeterminate<'0'>>();
      }).expectToCompile();
    });

    it(`Indeterminate<'1'> -> '0'`, () => {
      tsst(() => {
        the<'0', Indeterminate<'1'>>();
      }).expectToCompile();
    });

  });

  describe(`Determinate`, () => {

    it(`Determinate<Bool> -> '0'`, () => {
      tsst(() => {
        the<'0', Determinate<Bool>>();
      }).expectToCompile();
    });

    it(`Determinate<'0'> -> '1'`, () => {
      tsst(() => {
        the<'1', Determinate<'0'>>();
      }).expectToCompile();
    });

    it(`Determinate<'1'> -> '1'`, () => {
      tsst(() => {
        the<'1', Determinate<'1'>>();
      }).expectToCompile();
    });

  });

  describe(`DefinitelyYes`, () => {

    it(`DefinitelyYes<Bool> -> '0'`, () => {
      tsst(() => {
        the<'0', DefinitelyYes<Bool>>();
      }).expectToCompile();
    });

    it(`DefinitelyYes<'0'> -> '0'`, () => {
      tsst(() => {
        the<'0', DefinitelyYes<'0'>>();
      }).expectToCompile();
    });

    it(`DefinitelyYes<'1'> -> '1'`, () => {
      tsst(() => {
        the<'1', DefinitelyYes<'1'>>();
      }).expectToCompile();
    });

  });

  describe(`DefinitelyNo`, () => {

    it(`DefinitelyNo<Bool> -> '0'`, () => {
      tsst(() => {
        the<'0', DefinitelyNo<Bool>>();
      }).expectToCompile();
    });

    it(`DefinitelyNo<'0'> -> '1'`, () => {
      tsst(() => {
        the<'1', DefinitelyNo<'0'>>();
      }).expectToCompile();
    });

    it(`DefinitelyNo<'1'> -> '0'`, () => {
      tsst(() => {
        the<'0', DefinitelyNo<'1'>>();
      }).expectToCompile();
    });

  });

});
