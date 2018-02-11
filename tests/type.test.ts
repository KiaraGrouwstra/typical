import { tsst, the } from 'tsst-tycho';
import { isT, InstanceType } from './type';

describe(`type`, () => {

  describe(`InstanceType`, () => {

    it(`the<MyClass, InstanceType<typeof MyClass>>()`, () => {
      tsst(() => {
        class MyClass {}
        the<MyClass, InstanceType<typeof MyClass>>();
      }).expectToCompile();
    });

  });

});
