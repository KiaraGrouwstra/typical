import { the, Obj } from './util';
import { UnionHasKey, UnionToObject, IntersectionUnions, UnionContained, UnionEmpty, UnionsOverlap, IsUnion, Diff, UnionDiff } from './union';
import { ObjectHasKey } from './object';

import { And } from './boolean';

// type neverAccessTest = {a:1}[never]

the<'1', UnionHasKey<'a'|'b', 'b'>>();
the<'0', UnionHasKey<'a'|'b', 'c'>>();
the<'1', UnionHasKey<'a'|'b', 'a'|'b'>>();
the<'0', UnionHasKey<'a'|'b', 'c'|'d'>>();
the<'0'|'1', UnionHasKey<'a'|'b', 'b'|'c'>>();
the<'1', UnionHasKey<'a'|'b'|'toString', 'toString'>>();
the<'0', UnionHasKey<'a'|'b', 'toString'>>();
// ^ error: Type '() => string' does not satisfy the constraint '"0"'.

the<{ b: 'b', c: 'c' }, UnionToObject<'b' | 'c'>>();

// the<2|3, IntersectionUnions<1|2|3, 2|3|4>>(); // only strings allowed
the<'b'|'c', IntersectionUnions<'a' | 'b' | 'c', 'b' | 'c' | 'd'>>();
the<never, IntersectionUnions<'a' | 'b' | 'c', 'x' | 'z' | 'd'>>();

the<'1', UnionContained<never, 'a'>>();
the<'1', UnionContained<'a', 'a'>>();
the<'0', UnionContained<'b', 'a'>>();
the<'0', UnionContained<'a' | 'b', 'a'>>();

the<'1', UnionEmpty<never>>();
the<'0', UnionEmpty<'a'>>();
the<'0', UnionEmpty<'a' | 'b'>>();
the<'0', UnionEmpty<'toString'>>();
the<'0', UnionEmpty<'toString' | 'a'>>();

the<'1', UnionsOverlap<'a', 'a' | 'b'>>();
the<'0', UnionsOverlap<'a', 'c'>>();

the<'1', IsUnion<'a' | 'b'>>();
the<'0', IsUnion<'a'>>();
the<'0', IsUnion<never>>();
the<'1', IsUnion<'a' | undefined>>();
// ^ error: not all strings

the<'a'|'b', Diff<"a" | "b" | "c", "c" | "d">>();
// ^ error: Type '"a" | "b" | "c"' does not satisfy the constraint '"a" | "b"'.
the<'a'|'toString', Diff<'a' | 'b' | 'toString', 'a'>>();
// ^ error: () => string
the<'b', Diff<'a' | 'b', 'a' | 'toString'>>();
// ^ error: Type '"a" | "b"' does not satisfy the constraint '"b"'.

the<'a', UnionDiff<'a' | 'b' | 'c', 'b' | 'c' | 'd'>>();
the<'b'|'toString', UnionDiff<'a' | 'b' | 'toString', 'a'>>();
the<'b', UnionDiff<'a' | 'b', 'a' | 'toString'>>();
// ^ error: () => string
the<'0', ObjectHasKey<{ a: 1 }, "toString">>();
// ^ error: () => string
