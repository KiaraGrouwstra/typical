// @flow
import { tsst, the } from 'tsst-tycho';
import { Obj } from './util';
import { UnionHasKey, UnionToObject, IntersectionUnions, UnionContained, UnionEmpty, UnionsOverlap, IsUnion, Diff, UnionDiff } from './union';
import { ObjectHasKey } from './object';

import { And } from './boolean';

describe(`util`, () => {

  describe(`UnionHasKey`, () => {

    it(`the<'1', UnionHasKey<'a'|'b', 'b'>>()`, () => {
      tsst(() => {
        the<'1', UnionHasKey<'a'|'b', 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionHasKey<'a'|'b', 'c'>>()`, () => {
      tsst(() => {
        the<'0', UnionHasKey<'a'|'b', 'c'>>();
      }).expectToCompile();
    });

    it(`the<'1', UnionHasKey<'a'|'b', 'a'|'b'>>()`, () => {
      tsst(() => {
        the<'1', UnionHasKey<'a'|'b', 'a'|'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionHasKey<'a'|'b', 'c'|'d'>>()`, () => {
      tsst(() => {
        the<'0', UnionHasKey<'a'|'b', 'c'|'d'>>();
      }).expectToCompile();
    });

    it(`the<'0'|'1', UnionHasKey<'a'|'b', 'b'|'c'>>()`, () => {
      tsst(() => {
        the<'0'|'1', UnionHasKey<'a'|'b', 'b'|'c'>>();
      }).expectToCompile();
    });

    it(`the<'1', UnionHasKey<'a'|'b'|'toString', 'toString'>>()`, () => {
      tsst(() => {
        the<'1', UnionHasKey<'a'|'b'|'toString', 'toString'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionHasKey<'a'|'b', 'toString'>>()`, () => {
      tsst(() => {
        the<'0', UnionHasKey<'a'|'b', 'toString'>>();
      }).expectToCompile();
    });
    // ^ error: Type '() => string' does not satisfy the constraint '"0"'.

  });

  describe(`UnionToObject`, () => {

    it(`the<{ b: 'b', c: 'c' }, UnionToObject<'b' | 'c'>>()`, () => {
      tsst(() => {
        the<{ b: 'b', c: 'c' }, UnionToObject<'b' | 'c'>>();
      }).expectToCompile();
    });

  });

  describe(`IntersectionUnions`, () => {

    it(`the<2|3, IntersectionUnions<1|2|3, 2|3|4>>()`, () => {
      tsst(() => {
        the<2|3, IntersectionUnions<1|2|3, 2|3|4>>(); // only strings allowed
      }).expectToFail();
    });

    it(`the<'b'|'c', IntersectionUnions<'a' | 'b' | 'c', 'b' | 'c' | 'd'>>()`, () => {
      tsst(() => {
        the<'b'|'c', IntersectionUnions<'a' | 'b' | 'c', 'b' | 'c' | 'd'>>();
      }).expectToCompile();
    });

    it(`the<never, IntersectionUnions<'a' | 'b' | 'c', 'x' | 'z' | 'd'>>()`, () => {
      tsst(() => {
        the<never, IntersectionUnions<'a' | 'b' | 'c', 'x' | 'z' | 'd'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionContained`, () => {

    it(`the<'1', UnionContained<never, 'a'>>()`, () => {
      tsst(() => {
        the<'1', UnionContained<never, 'a'>>();
      }).expectToCompile();
    });

    it(`the<'1', UnionContained<'a', 'a'>>()`, () => {
      tsst(() => {
        the<'1', UnionContained<'a', 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionContained<'b', 'a'>>()`, () => {
      tsst(() => {
        the<'0', UnionContained<'b', 'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionContained<'a' | 'b', 'a'>>()`, () => {
      tsst(() => {
        the<'0', UnionContained<'a' | 'b', 'a'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionEmpty`, () => {

    it(`the<'1', UnionEmpty<never>>()`, () => {
      tsst(() => {
        the<'1', UnionEmpty<never>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionEmpty<'a'>>()`, () => {
      tsst(() => {
        the<'0', UnionEmpty<'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionEmpty<'a' | 'b'>>()`, () => {
      tsst(() => {
        the<'0', UnionEmpty<'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionEmpty<'toString'>>()`, () => {
      tsst(() => {
        the<'0', UnionEmpty<'toString'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionEmpty<'toString' | 'a'>>()`, () => {
      tsst(() => {
        the<'0', UnionEmpty<'toString' | 'a'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionsOverlap`, () => {

    it(`the<'1', UnionsOverlap<'a', 'a' | 'b'>>()`, () => {
      tsst(() => {
        the<'1', UnionsOverlap<'a', 'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', UnionsOverlap<'a', 'c'>>()`, () => {
      tsst(() => {
        the<'0', UnionsOverlap<'a', 'c'>>();
      }).expectToCompile();
    });

  });

  describe(`IsUnion`, () => {

    it(`the<'1', IsUnion<'a' | 'b'>>()`, () => {
      tsst(() => {
        the<'1', IsUnion<'a' | 'b'>>();
      }).expectToCompile();
    });

    it(`the<'0', IsUnion<'a'>>()`, () => {
      tsst(() => {
        the<'0', IsUnion<'a'>>();
      }).expectToCompile();
    });

    it(`the<'0', IsUnion<never>>()`, () => {
      tsst(() => {
        the<'0', IsUnion<never>>();
      }).expectToCompile();
    });

    it(`the<'1', IsUnion<'a' | undefined>>()`, () => {
      tsst(() => {
        the<'1', IsUnion<'a' | undefined>>();
      }).expectToCompile();
    });
    // ^ error: not all strings

  });

  describe(`Diff`, () => {

    it(`the<'a'|'b', Diff<"a" | "b" | "c", "c" | "d">>()`, () => {
      tsst(() => {
        the<'a'|'b', Diff<"a" | "b" | "c", "c" | "d">>();
      }).expectToCompile();
    });

    it(`the<'b'|'toString', Diff<'a' | 'b' | 'toString', 'a'>>()`, () => {
      tsst(() => {
        the<'b'|'toString', Diff<'a' | 'b' | 'toString', 'a'>>();
      }).expectToCompile();
    });

    it(`the<'b', Diff<'a' | 'b', 'a' | 'toString'>>()`, () => {
      tsst(() => {
        the<'b', Diff<'a' | 'b', 'a' | 'toString'>>();
      }).expectToCompile();
    });

  });

  describe(`UnionDiff`, () => {

    it(`the<'a', UnionDiff<'a' | 'b' | 'c', 'b' | 'c' | 'd'>>()`, () => {
      tsst(() => {
        the<'a', UnionDiff<'a' | 'b' | 'c', 'b' | 'c' | 'd'>>();
      }).expectToCompile();
    });

    it(`the<'b'|'toString', UnionDiff<'a' | 'b' | 'toString', 'a'>>()`, () => {
      tsst(() => {
        the<'b'|'toString', UnionDiff<'a' | 'b' | 'toString', 'a'>>();
      }).expectToCompile();
    });

    it(`the<'b', UnionDiff<'a' | 'b', 'a' | 'toString'>>()`, () => {
      tsst(() => {
        the<'b', UnionDiff<'a' | 'b', 'a' | 'toString'>>();
      }).expectToCompile();
    });

    it(`the<'0', ObjectHasKey<{ a: 1 }, "toString">>()`, () => {
      tsst(() => {
        the<'0', ObjectHasKey<{ a: 1 }, "toString">>();
      }).expectToCompile();
    });
    // ^ error: () => string

  });

});
