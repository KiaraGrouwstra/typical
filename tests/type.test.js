// @flow
import { tsst, the } from 'tsst-tycho';
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
