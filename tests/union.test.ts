import { tsst, the } from 'tsst-tycho';
import { Obj } from '../src/util';
import { UnionHasKey, UnionToObject, UnionContained, UnionEmpty, UnionsOverlap, IsUnion } from '../src/union';
import { ObjectHasKey } from '../src/object';

import { And } from './boolean';

describe(`util`, () => {

  describe(`UnionHasKey`, () => {

    it(`the<'1', UnionHasKey<'a'|'b', 'b'>>`, () => {
      tsst(() => {
        the<'1', UnionHasKey<'a'|'b', 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionHasKey<'a'|'b', 'c'>>`, () => {
      tsst(() => {
        the<'0', UnionHasKey<'a'|'b', 'c'>>();
      }).expectToCompile();
    });

    it(`the<'1', UnionHasKey<'a'|'b', 'a'|'b'>>`, () => {
      tsst(() => {
        the<'1', UnionHasKey<'a'|'b', 'a'|'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionHasKey<'a'|'b', 'c'|'d'>>`, () => {
      tsst(() => {
        the<'0', UnionHasKey<'a'|'b', 'c'|'d'>>();
      }).expectToCompile();
    });

    it(`the<'0'|'1', UnionHasKey<'a'|'b', 'b'|'c'>>`, () => {
      tsst(() => {
        the<'0'|'1', UnionHasKey<'a'|'b', 'b'|'c'>>();
      }).expectToCompile();
    });

    it(`the<'1', UnionHasKey<'a'|'b'|'toString', 'toString'>>`, () => {
      tsst(() => {
        the<'1', UnionHasKey<'a'|'b'|'toString', 'toString'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionHasKey<'a'|'b', 'toString'>>`, () => {
      tsst(() => {
        the<'0', UnionHasKey<'a'|'b', 'toString'>>();
      }).expectToCompile();
    });
    // ^ error: Type '() => string' does not satisfy the constraint '"0"'.

  });

  describe(`UnionToObject`, () => {

    it(`the<{ b: 'b', c: 'c' }, UnionToObject<'b' | 'c'>>`, () => {
      tsst(() => {
        the<{ b: 'b', c: 'c' }, UnionToObject<'b' | 'c'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionContained`, () => {

    it(`the<'1', UnionContained<never, 'a'>>`, () => {
      tsst(() => {
        the<'1', UnionContained<never, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'1', UnionContained<'a', 'a'>>`, () => {
      tsst(() => {
        the<'1', UnionContained<'a', 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionContained<'b', 'a'>>`, () => {
      tsst(() => {
        the<'0', UnionContained<'b', 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionContained<'a' | 'b', 'a'>>`, () => {
      tsst(() => {
        the<'0', UnionContained<'a' | 'b', 'a'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionEmpty`, () => {

    it(`the<'1', UnionEmpty<never>>`, () => {
      tsst(() => {
        the<'1', UnionEmpty<never>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionEmpty<'a'>>`, () => {
      tsst(() => {
        the<'0', UnionEmpty<'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionEmpty<'a' | 'b'>>`, () => {
      tsst(() => {
        the<'0', UnionEmpty<'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionEmpty<'toString'>>`, () => {
      tsst(() => {
        the<'0', UnionEmpty<'toString'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionEmpty<'toString' | 'a'>>`, () => {
      tsst(() => {
        the<'0', UnionEmpty<'toString' | 'a'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionsOverlap`, () => {

    it(`the<'1', UnionsOverlap<'a', 'a' | 'b'>>`, () => {
      tsst(() => {
        the<'1', UnionsOverlap<'a', 'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionsOverlap<'a', 'c'>>`, () => {
      tsst(() => {
        the<'0', UnionsOverlap<'a', 'c'>>();
      }).expectToCompile();
    });

  });

  describe(`IsUnion`, () => {

    it(`the<'1', IsUnion<'a' | 'b'>>`, () => {
      tsst(() => {
        the<'1', IsUnion<'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', IsUnion<'a'>>`, () => {
      tsst(() => {
        the<'0', IsUnion<'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', IsUnion<never>>`, () => {
      tsst(() => {
        the<'0', IsUnion<never>>();
      }).expectToCompile();
    });

    it(`the<'1', IsUnion<'a' | undefined>>`, () => {
      tsst(() => {
        the<'1', IsUnion<'a' | undefined>>();
      }).expectToCompile();
    });
    // ^ error: not all strings

  });

});
