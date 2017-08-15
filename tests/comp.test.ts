import { tsst, the } from 'tsst';
import { StringsEqual, NumbersEqual, Gt, Lt, Gte, Lte /*, Max, Min*/ } from './comp';

describe(`comp`, () => {

  describe(`StringsEqual`, () => {

    it(`the<'1', StringsEqual<'a', 'a'>>()`, () => {
      tsst(() => {
        the<'1', StringsEqual<'a', 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', StringsEqual<'a', 'b'>>()`, () => {
      tsst(() => {
        the<'0', StringsEqual<'a', 'b'>>();
      }).expectToCompile();
    });

  });

  describe(`NumbersEqual`, () => {

    it(`the<'1', NumbersEqual<123, 123>>()`, () => {
      tsst(() => {
        the<'1', NumbersEqual<123, 123>>();
      }).expectToCompile();
    });

    it(`the<'0', NumbersEqual<123, 456>>()`, () => {
      tsst(() => {
        the<'0', NumbersEqual<123, 456>>();
      }).expectToCompile();
    });

    it(`the<'1', NumbersEqual<123, '123'>>()`, () => {
      tsst(() => {
        the<'1', NumbersEqual<123, '123'>>(); // numbers only
      }).expectToFail();
    });

    it(`the<'1', NumbersEqual<'123', 123>>()`, () => {
      tsst(() => {
        the<'1', NumbersEqual<'123', 123>>(); // numbers only
      }).expectToFail();
    });

    it(`the<'0', NumbersEqual<0, 5>>()`, () => {
      tsst(() => {
        the<'0', NumbersEqual<0, 5>>();
      }).expectToCompile();
    });

    it(`the<'0', NumbersEqual<5, 0>>()`, () => {
      tsst(() => {
        the<'0', NumbersEqual<5, 0>>();
      }).expectToCompile();
    });

  });

  describe(`Gt`, () => {

    it(`the<'1', Gt<3, 2>>()`, () => {
      tsst(() => {
        the<'1', Gt<3, 2>>();
      }).expectToCompile();
    });

    it(`the<'0', Gt<2, 3>>()`, () => {
      tsst(() => {
        the<'0', Gt<2, 3>>();
      }).expectToCompile();
    });

    it(`the<'0', Gt<3, 3>>()`, () => {
      tsst(() => {
        the<'0', Gt<3, 3>>();
      }).expectToCompile();
    });

  });

  describe(`Lt`, () => {

    it(`the<'0', Lt<3, 2>>()`, () => {
      tsst(() => {
        the<'0', Lt<3, 2>>();
      }).expectToCompile();
    });

    it(`the<'1', Lt<2, 3>>()`, () => {
      tsst(() => {
        the<'1', Lt<2, 3>>();
      }).expectToCompile();
    });

    it(`the<'0', Lt<3, 3>>()`, () => {
      tsst(() => {
        the<'0', Lt<3, 3>>();
      }).expectToCompile();
    });

  });

  describe(`Gte`, () => {

    it(`the<'1', Gte<3, 2>>()`, () => {
      tsst(() => {
        the<'1', Gte<3, 2>>();
      }).expectToCompile();
    });

    it(`the<'0', Gte<2, 3>>()`, () => {
      tsst(() => {
        the<'0', Gte<2, 3>>();
      }).expectToCompile();
    });

    it(`the<'1', Gte<3, 3>>()`, () => {
      tsst(() => {
        the<'1', Gte<3, 3>>();
      }).expectToCompile();
    });

  });

  describe(`Lte`, () => {

    it(`the<'0', Lte<3, 2>>()`, () => {
      tsst(() => {
        the<'0', Lte<3, 2>>();
      }).expectToCompile();
    });

    it(`the<'1', Lte<2, 3>>()`, () => {
      tsst(() => {
        the<'1', Lte<2, 3>>();
      }).expectToCompile();
    });

    it(`the<'1', Lte<3, 3>>()`, () => {
      tsst(() => {
        the<'1', Lte<3, 3>>();
      }).expectToCompile();
    });

  });

  describe(`Max`, () => {

    it(`the<6, Max<3, 6>>()`, () => {
      tsst(() => {
        the<6, Max<3, 6>>();
      }).expectToCompile();
    });

    it(`the<5, Max<5, 2>>()`, () => {
      tsst(() => {
        the<5, Max<5, 2>>();
      }).expectToCompile();
    });

  });

  describe(`Min`, () => {

    it(`the<3, Min<3, 6>>()`, () => {
      tsst(() => {
        the<3, Min<3, 6>>();
      }).expectToCompile();
    });

    it(`the<2, Min<5, 2>>()`, () => {
      tsst(() => {
        the<2, Min<5, 2>>();
      }).expectToCompile();
    });

  });

});
