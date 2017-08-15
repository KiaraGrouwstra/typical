import { tsst, the } from 'tsst';
import { isT } from './type';

describe(`type`, () => {

  it(`compiles`, () => {
    tsst(() => {
      // compiles
    }).expectToCompile();
  });

  describe(`Matches`, () => {

  });

});
