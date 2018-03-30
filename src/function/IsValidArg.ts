/**
 * Check if an inferred parameter on a function type exists.
 * @see https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-374191157
 */
export type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;
