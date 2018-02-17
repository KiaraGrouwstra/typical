import { tsst, the } from 'tsst-tycho';

describe(`stdlib`, () => {

  describe(`Partial`, () => {
    it(`the<{ a?: 1, b?: 2 }, Partial<{ a: 1, b: 2 }>>`, () => {
      tsst(() => {
        the<{ a?: 1, b?: 2 }, Partial<{ a: 1, b: 2 }>>();
      }).expectToCompile();
    });
  });

  describe(`Readonly`, () => {
    it(`the<{ readonly a: 1 }, Readonly<{ a: 1 }>>`, () => {
      tsst(() => {
        the<{ readonly a: 1 }, Readonly<{ a: 1 }>>();
      }).expectToCompile();
    });
  });

  describe(`Pick`, () => {
    it(`the<{ a: 1 }, Pick<{ a: 1, b: 2 }, 'a'>>`, () => {
      tsst(() => {
        the<{ a: 1 }, Pick<{ a: 1, b: 2 }, 'a'>>();
      }).expectToCompile();
    });
  });

  describe(`Record`, () => {
    it(`the<{ a: 1, b: 1 }, Record<'a' | 'b', 1>>`, () => {
      tsst(() => {
        the<{ a: 1, b: 1 }, Record<'a' | 'b', 1>>();
      }).expectToCompile();
    });
  });

  describe(`Exclude`, () => {
    it(`the<1|2, Exclude<1|2|3, 3|4>>`, () => {
      tsst(() => {
        the<1|2, Exclude<1|2|3, 3|4>>();
      }).expectToCompile();
    });
  });

  describe(`Extract`, () => {
    it(`the<2|3, Extract<1|2|3, 2|3|4>>`, () => {
      tsst(() => {
        the<2|3, Extract<1|2|3, 2|3|4>>();
      }).expectToCompile();
    });
  });

  describe(`NonNullable`, () => {
    it(`the<1, NonNullable<1 | null>>`, () => {
      tsst(() => {
        the<1, NonNullable<1 | null>>();
      }).expectToCompile();
    });
  });

  describe(`ReturnType`, () => {
    it(`the<string, ReturnType<() => string>>`, () => {
      tsst(() => {
        the<string, ReturnType<() => string>>();
      }).expectToCompile();
    });
  });

  describe(`InstanceType`, () => {

    it(`the<string, InstanceType<new () => string>>`, () => {
      tsst(() => {
        the<string, InstanceType<new () => string>>();
      }).expectToCompile();
    });
 
    it(`the<MyClass, InstanceType<typeof MyClass>>`, () => {
      tsst(() => {
        class MyClass {}
        the<MyClass, InstanceType<typeof MyClass>>();
      }).expectToCompile();
    });

    describe(`Required`, () => {
      it(`the<{ a: 1 }, Required<{ a?: 1 }>>`, () => {
        tsst(() => {
          the<{ a: 1 }, Required<{ a?: 1 }>>();
        }).expectToCompile();
      });
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
