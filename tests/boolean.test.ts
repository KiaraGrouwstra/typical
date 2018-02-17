import { tsst, the } from 'tsst-tycho';
import { Bool } from '../src/util';
import { Not, And, Or, Indeterminate, Determinate, DefinitelyYes, DefinitelyNo, IsTruthy, IsFalsy } from '../src/boolean';
import { UnionHasKey } from '../src/union';

describe(`boolean`, () => {

  describe(`Not`, () => {

    it(`the<'1', Not<'0'>>`, () => {
      tsst(() => {
        the<'1', Not<'0'>>();
      }).expectToCompile();
    });

    it(`the<'0', Not<'1'>>`, () => {
      tsst(() => {
        the<'0', Not<'1'>>();
      }).expectToCompile();
    });

    xit(`the<Bool, Not<'2'>>`, () => {
      tsst(() => {
        the<Bool, Not<'2'>>();
      }).expectToCompile();
    });

    xit(`the<'0', Not<'true'>>`, () => {
      tsst(() => {
        the<'0', Not<'true'>>();
      }).expectToCompile();
    });

    xit(`the<'1', Not<'false'>>`, () => {
      tsst(() => {
        the<'1', Not<'false'>>();
      }).expectToCompile();
    });

    xit(`the<never, Not<any>>`, () => {
      tsst(() => {
        the<never, Not<any>>();
      }).expectToCompile();
    });

    it(`the<Bool, Not<never>>`, () => {
      tsst(() => {
        the<Bool, Not<never>>(); // any
      }).expectToCompile();
    });

    xit(`the<'0', Not<true>>`, () => {
      tsst(() => {
        the<'0', Not<true>>(); // any
      }).expectToCompile();
    });

    xit(`the<'1', Not<false>>`, () => {
      tsst(() => {
        the<'1', Not<false>>(); // any
      }).expectToCompile();
    });

  });

  describe(`And`, () => {

    it(`the<'1', And<'1', '1'>>`, () => {
      tsst(() => {
        the<'1', And<'1', '1'>>();
      }).expectToCompile();
    });

    it(`the<'0', And<'0', '1'>>`, () => {
      tsst(() => {
        the<'0', And<'0', '1'>>();
      }).expectToCompile();
    });

  });

  describe(`Or`, () => {

    it(`the<'1', Or<'1', '0'>>`, () => {
      tsst(() => {
        the<'1', Or<'1', '0'>>();
      }).expectToCompile();
    });

    it(`the<'0', Or<'0', '0'>>`, () => {
      tsst(() => {
        the<'0', Or<'0', '0'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionHasKey`, () => {

    it(`the<'1', UnionHasKey<Bool,'0'>>`, () => {
      tsst(() => {
        the<'1', UnionHasKey<Bool,'0'>>();
      }).expectToCompile();
    });

    it(`the<'1', UnionHasKey<Bool,'1'>>`, () => {
      tsst(() => {
        the<'1', UnionHasKey<Bool,'1'>>();
      }).expectToCompile();
    });

    it(`the<'1', UnionHasKey<Bool,'0'> | UnionHasKey<Bool,'1'>>`, () => {
      tsst(() => {
        the<'1', UnionHasKey<Bool,'0'> | UnionHasKey<Bool,'1'>>();
      }).expectToCompile();
    });

    it(`the<'1', And<UnionHasKey<Bool,'0'>, UnionHasKey<Bool,'1'>>>`, () => {
      tsst(() => {
        the<'1', And<UnionHasKey<Bool,'0'>, UnionHasKey<Bool,'1'>>>();
      }).expectToCompile();
    });

  });

  describe(`Indeterminate`, () => {
    // ^ broke, along with dependents!
    // ^ regression in recent TS?

    it(`the<'1', Indeterminate<Bool>>`, () => {
      tsst(() => {
        the<'1', Indeterminate<Bool>>();
      }).expectToCompile();
    });

    it(`the<'0', Indeterminate<'0'>>`, () => {
      tsst(() => {
        the<'0', Indeterminate<'0'>>();
      }).expectToCompile();
    });

    it(`the<'0', Indeterminate<'1'>>`, () => {
      tsst(() => {
        the<'0', Indeterminate<'1'>>();
      }).expectToCompile();
    });

  });

  describe(`Determinate`, () => {

    it(`the<'0', Determinate<Bool>>`, () => {
      tsst(() => {
        the<'0', Determinate<Bool>>();
      }).expectToCompile();
    });

    it(`the<'1', Determinate<'0'>>`, () => {
      tsst(() => {
        the<'1', Determinate<'0'>>();
      }).expectToCompile();
    });

    it(`the<'1', Determinate<'1'>>`, () => {
      tsst(() => {
        the<'1', Determinate<'1'>>();
      }).expectToCompile();
    });

  });

  describe(`DefinitelyYes`, () => {

    it(`the<'0', DefinitelyYes<Bool>>`, () => {
      tsst(() => {
        the<'0', DefinitelyYes<Bool>>();
      }).expectToCompile();
    });

    it(`the<'0', DefinitelyYes<'0'>>`, () => {
      tsst(() => {
        the<'0', DefinitelyYes<'0'>>();
      }).expectToCompile();
    });

    it(`the<'1', DefinitelyYes<'1'>>`, () => {
      tsst(() => {
        the<'1', DefinitelyYes<'1'>>();
      }).expectToCompile();
    });

  });

  describe(`DefinitelyNo`, () => {

    it(`the<'0', DefinitelyNo<Bool>>`, () => {
      tsst(() => {
        the<'0', DefinitelyNo<Bool>>();
      }).expectToCompile();
    });

    it(`the<'1', DefinitelyNo<'0'>>`, () => {
      tsst(() => {
        the<'1', DefinitelyNo<'0'>>();
      }).expectToCompile();
    });

    it(`the<'0', DefinitelyNo<'1'>>`, () => {
      tsst(() => {
        the<'0', DefinitelyNo<'1'>>();
      }).expectToCompile();
    });

  });

  describe(`IsTruthy`, () => {

    it(`the<'1', IsTruthy<true>>`, () => {
      tsst(() => {
        the<'1', IsTruthy<true>>();
      }).expectToCompile();
    });

    it(`the<'0', IsTruthy<false>>`, () => {
      tsst(() => {
        the<'0', IsTruthy<false>>();
      }).expectToCompile();
    });

    it(`the<'1', IsTruthy<123>>`, () => {
      tsst(() => {
        the<'1', IsTruthy<123>>();
      }).expectToCompile();
    });

    it(`the<'0', IsTruthy<0>>`, () => {
      tsst(() => {
        the<'0', IsTruthy<0>>();
      }).expectToCompile();
    });

    it(`the<IsTruthy<'s' | null>, Bool>`, () => {
      tsst(() => {
        the<IsTruthy<'s' | null>, Bool>();
      }).expectToCompile();
    });

  });

  describe(`IsFalsy`, () => {

    it(`the<'0', IsFalsy<true>>`, () => {
      tsst(() => {
        the<'0', IsFalsy<true>>();
      }).expectToCompile();
    });

    it(`the<'1', IsFalsy<false>>`, () => {
      tsst(() => {
        the<'1', IsFalsy<false>>();
      }).expectToCompile();
    });

    it(`the<'0', IsFalsy<123>>`, () => {
      tsst(() => {
        the<'0', IsFalsy<123>>();
      }).expectToCompile();
    });

    it(`the<'1', IsFalsy<0>>`, () => {
      tsst(() => {
        the<'1', IsFalsy<0>>();
      }).expectToCompile();
    });

    it(`the<IsFalsy<'s' | null>, Bool>`, () => {
      tsst(() => {
        the<IsFalsy<'s' | null>, Bool>();
      }).expectToCompile();
    });

  });

});
