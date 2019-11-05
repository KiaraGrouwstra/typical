# Typical

Typical is a playground of type-level operations for TypeScript.
It is mostly experimental and not ready to use yet.
For a lib usable today, try one of the [other](https://github.com/tycho01/typical/#similar-projects) type libraries.

<!--
### Installing

```
npm i typical-ts
```
-->

### [Docs](http://tycho01.github.io/typical/index.html)

### Background?

Typical has had a long-term focus, exploring what we can do with types.
The end goal is to enable type-safe functional programming with e.g. [ramda](http://ramdajs.com/docs/) and [partial lenses](https://github.com/calmm-js/partial.lenses/). Existing [typings](https://github.com/types/npm-ramda/) provide some level of type safety, but not enough.
Front-end engineering is a [royal](https://github.com/reactjs/redux/blob/master/examples/todos/src/actions/index.js) [pain](https://github.com/ngrx/platform/blob/master/example-app/app/books/actions/book.ts), and functional libraries would [save us](https://github.com/calmm-js/kral-todomvc/blob/master/src/todos-meta.js#L17-L24) given proper type inference.

### Contributing

- [issues](https://github.com/tycho01/typical/issues/)
- [`tsc` output](https://github.com/tycho01/typical/blob/master/tsc.log)
- [test output](https://github.com/tycho01/typical/blob/master/errors.log)

These can be rerun with `npm test`.

### Similar projects

- [`ts-toolbelt`](https://github.com/pirix-gh/ts-toolbelt), a more mature type lib
- [`type-zoo`](https://github.com/pelotom/type-zoo), a modest type lib usable today
- [`typelevel-ts`](https://github.com/gcanti/typelevel-ts), a type lib by [@gcanti](https://github.com/gcanti), author of several FP libs in TS
- [`typepark`](https://github.com/kgtkr/typepark), a new type collection offering tuple manipulation and `Pipe`
