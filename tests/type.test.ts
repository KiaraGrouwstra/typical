import { tsst, the } from 'tsst-tycho';
import { isT, InstanceType, Xor } from './type';

describe(`type`, () => {

  describe(`InstanceType`, () => {

    it(`the<MyClass, InstanceType<typeof MyClass>>()`, () => {
      tsst(() => {
        class MyClass {}
        the<MyClass, InstanceType<typeof MyClass>>();
      }).expectToCompile();
    });

  });

  describe(`Xor`, () => {

    type Person<T> = Xor<T, { name: string; }, { firstname: string; lastname: string; }>;

    it(`the<never, Xor<string, number, boolean>>()`, () => {
      tsst(() => {
        the<never, Xor<string, number, boolean>>();
      }).expectToCompile();
    });

    it(`the<{ name: 's' }, Xor<{ name: 's' }>>()`, () => {
      tsst(() => {
        the<{ name: 's' }, Person<{ name: 's' }>>();
      }).expectToCompile();
    });

    it(`the<never, Person<{ name: 's', firstname: 'f', lastname: 'l' }>>()`, () => {
      tsst(() => {
        the<never, Person<{ name: 's', firstname: 'f', lastname: 'l' }>>();
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
