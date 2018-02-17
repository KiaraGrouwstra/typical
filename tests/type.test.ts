import { tsst, the } from 'tsst-tycho';
import { Xor, Matches, TypesEqual, InstanceOf, Awaited, Flatten, Widen, DiscriminateUnion, Const } from '../src/type';

describe(`type`, () => {

  describe(`Xor`, () => {

    type Person<T> = Xor<T, { name: string; }, { firstname: string; lastname: string; }>;

    it(`the<never, Xor<string, number, boolean>>`, () => {
      tsst(() => {
        the<never, Xor<string, number, boolean>>();
      }).expectToCompile();
    });

    it(`the<{ name: 's' }, Xor<{ name: 's' }>>`, () => {
      tsst(() => {
        the<{ name: 's' }, Person<{ name: 's' }>>();
      }).expectToCompile();
    });

    it(`the<never, Person<{ name: 's', firstname: 'f', lastname: 'l' }>>`, () => {
      tsst(() => {
        the<never, Person<{ name: 's', firstname: 'f', lastname: 'l' }>>();
      }).expectToCompile();
    });

  });

  describe(`Matches`, () => {

    it(`the<'1', Matches<1, number>>`, () => {
      tsst(() => {
        the<'1', Matches<1, number>>();
      }).expectToCompile();
    });

    it(`the<'1', Matches<number, number>>`, () => {
      tsst(() => {
        the<'1', Matches<number, number>>();
      }).expectToCompile();
    });

    it(`the<'0', Matches<false, number>>`, () => {
      tsst(() => {
        the<'0', Matches<false, number>>();
      }).expectToCompile();
    });

  });

  describe(`TypesEqual`, () => {

    it(`the<'0', TypesEqual<string, number>>`, () => {
      tsst(() => {
        the<'0', TypesEqual<string, number>>();
      }).expectToCompile();
    });

    it(`the<'1', TypesEqual<string, string>>`, () => {
      tsst(() => {
        the<'1', TypesEqual<string, string>>();
      }).expectToCompile();
    });

  });

  describe(`InstanceOf`, () => {

    it(`the<'1', InstanceOf<1, number>>`, () => {
      tsst(() => {
        the<'1', InstanceOf<1, number>>();
      }).expectToCompile();
    });

    it(`the<'0', InstanceOf<number, number>>`, () => {
      tsst(() => {
        the<'0', InstanceOf<number, number>>();
      }).expectToCompile();
    });

    it(`the<'0', InstanceOf<false, number>>`, () => {
      tsst(() => {
        the<'0', InstanceOf<false, number>>();
      }).expectToCompile();
    });

  });

  describe(`Awaited`, () => {

    it(`the<1, Awaited<1>>`, () => {
      tsst(() => {
        the<1, Awaited<1>>();
      }).expectToCompile();
    });

    it(`the<1, Awaited<Promise<1>>>`, () => {
      tsst(() => {
        the<1, Awaited<Promise<1>>>();
      }).expectToCompile();
    });

    it(`the<1, Awaited<Promise<Promise<1>>>>`, () => {
      tsst(() => {
        the<1, Awaited<Promise<Promise<1>>>>();
      }).expectToCompile();
    });

    it(`the<1, Awaited<1 | Promise<1>>>`, () => {
      tsst(() => {
        the<1, Awaited<1 | Promise<1>>>();
      }).expectToCompile();
    });

  });

  describe(`Flatten`, () => {

    it(`the<1, Flatten<1>>`, () => {
      tsst(() => {
        the<1, Flatten<1>>();
      }).expectToCompile();
    });

    it(`the<1, Flatten<[1, 1]>>`, () => {
      tsst(() => {
        the<1, Flatten<[1, 1]>>();
      }).expectToCompile();
    });

    it(`the<1, Flatten<[1, [1]]>>`, () => {
      tsst(() => {
        the<1, Flatten<[1, [1]]>>();
      }).expectToCompile();
    });

  });

  describe(`Widen`, () => {

    it(`the<Widen<1>, number>`, () => {
      tsst(() => {
        the<Widen<1>, number>();
      }).expectToCompile();
    });

    it(`the<Widen<true>, boolean>`, () => {
      tsst(() => {
        the<Widen<true>, boolean>();
      }).expectToCompile();
    });

    it(`the<Widen<'s'>, string>`, () => {
      tsst(() => {
        the<Widen<'s'>, string>();
      }).expectToCompile();
    });

  });

  describe(`DiscriminateUnion`, () => {

    it(`the<Rectangle, DiscriminateShape<'rectangle'>>`, () => {
      tsst(() => {
        interface Square {
            kind: "square";
            size: number;
        }
        interface Rectangle {
            kind: "rectangle";
            width: number;
            height: number;
        }
        interface Circle {
            kind: "circle";
            radius: number;
        }
        type Shape = Square | Rectangle | Circle;
        type DiscriminateShape<V extends Shape['kind']> = DiscriminateUnion<Shape, 'kind', V>;
        the<Rectangle, DiscriminateShape<'rectangle'>>();
      }).expectToCompile();
    });

  });

  describe(`Const`, () => {

    it(`the<1, Const<1, 2>>`, () => {
      tsst(() => {
        the<1, Const<1, 2>>();
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
