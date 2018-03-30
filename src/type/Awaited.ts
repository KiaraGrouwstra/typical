/**
 * Unwrap a `Promise` to obtain its return value.
 * @see https://github.com/Microsoft/TypeScript/pull/21613
 */
export type Awaited<T> = {
    '1': T extends { then(onfulfilled: (value: infer U) => any): any; } ? Awaited<U> : T;
  }[T extends number ? '1' : '1'];
  