# [Progress](https://github.com/Microsoft/TypeScript/issues/16392)

# Errors

Just do a search in the code base for `error`. Should find a bunch. Many should get resolved once #17456 lands at least, so might as well check only after.

# Notes

- For me `npm test` seems to hand, while manually running `tsc src/spec.ts` works fine. Dunno why.

# Todo

- figure out modules/namespaces?

Thinking of good names to distinguish the following things that are all a lot like arrays:
- `Array<number>` (list: homogeneous array of unknown length)
- `[number, string]` (tuple: fixed-length array)
- `[number, number]` (vector: homogeneous tuple)
- `{ 0: number, 1: string }` (numerically-indexed object)
- `{ 0: number, 1: string, length: number }` (-> satisfies `ArrayLike`, numerically-indexed object with `length` property)
- `{ 0: number, 1: string, length: 2 }` (`ArrayLike` with known `length`? currently `list.ts` is dedicated to this variant, but confusingly my type `List` is just an alias for `ArrayLike`, though there is no way to distinguish this from that in type-checks so far anyway)
- `{ 0: number, 1: string, length: 2, <all Array prototype crap> }` (object-like type pretending to be a JS array?)

Known edge-cases to test for:
- union types input: the result of a type function should equal that of the union of the individual inputs (`F<A|B> == F<A>|F<B>`, distributivity)
- sub-types: given sub-types of the envisioned input, the output should also extend that of the original (for `A < B`, `F<A> < F<B>`)
- super-types: given super-types of the envisioned input, the output should also be a super-type of the original (for `A > B`, `F<A> > F<B>`)
- prototypes: type functions should be tested for input involving methods on `Object.prototype` -- that is, for objects try having an explicit `toString` method, for string input, try `toString`.
