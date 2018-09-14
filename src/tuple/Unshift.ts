/**
 * Returns the given tuple/array with the item type prepended to it
 */
type Unshift<List extends any[], Item> =
	((first: Item, ...rest: List) => any) extends ((...list: infer R) => any) ? R : never;
