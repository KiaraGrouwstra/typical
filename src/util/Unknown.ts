/**
 * The type of all values; nothing is known about it a priori
 * except that it exists. The same idea as Flow's `mixed` type.
 * Borrowed from @pelotom's `type-zoo`
 *
 * @see https://github.com/pelotom/type-zoo/#unknown
 * @see https://github.com/Microsoft/TypeScript/issues/10715
 */
export type Unknown = {} | undefined | null;
