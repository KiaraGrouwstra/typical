### tl;dr?

Lodash for types.

### Background?

I'd been trying to type a library (Ramda -- [repo](http://ramdajs.com/docs/), [typings](https://github.com/types/npm-ramda/)), and found that there would be a lot more return types we *could* be figuring out the types for -- no-one had just quite figured out how to compose the basic type operators to construct larger building blocks yet. That is where this library comes in.

### Docs?

None yet. Check the [source and/or specs](https://github.com/tycho01/typical/tree/master/src)!

### [Progress](https://github.com/Microsoft/TypeScript/issues/16392)

### Notes

- For me `npm test` seems to hang, while manually running `tsc src/spec.ts` works fine. Dunno why.

### Contributing

Just do a search in the code base for `error` or run the tests (see above). Should find plenty issues left. Many should get resolved once #17456 lands at least, so might as well check only after.

### Todo

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
- union types input: the result of a type function should ~~equal~~ include that of the union of the individual inputs (`F<A|B> >= F<A>|F<B>`, distributivity)?... though things like `Indeterminate` and its dependents would definitely not satisfy this, nor e.g. `IsUnion`... where does this discrepancy stem from? `UnionHasKey`?
    - which union-proof inputs can take `never`? seemingly all basic operators minus property access are `never`-proof. somehow `&` also failed, thought that's fixed since TS 2.5?
- sub-types: given sub-types of the envisioned input (e.g. `'a'` -> `'a' & string`), the output should also extend that of the original (for `A < B`, `F<A> < F<B>`)
- super-types: given super-types of the envisioned input, the output should also be a super-type of the original (for `A > B`, `F<A> > F<B>`)
- prototypes: type functions should be tested for input involving methods on `Object.prototype` -- that is, for objects try having an explicit `toString` method, for string input, try `toString`.
