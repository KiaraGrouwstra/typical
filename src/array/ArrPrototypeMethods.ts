/**
 * Unions of keys used to access prototype methods on array/tuple types.
 */
export type ArrPrototypeMethods = 'length' | 'push' | 'pop' | 'concat' | 'join' | 'reverse' | 'shift' | 'slice' | 'sort' | 'splice' | 'unshift' | 'indexOf' | 'lastIndexOf' | 'every' | 'some' | 'forEach' | 'map' | 'filter' | 'reduce' | 'reduceRight' | 'find' | 'findIndex' | 'fill' | 'copyWithin' | 'entries' | 'keys' | 'values'
// 'toLocaleString' | 'toString' | 
// type ArrPrototype = {[K in ArrPrototypeMethods]: K };
// type ArrPrototypeHas<K extends string> = ObjectHasKey<ArrPrototype, K>;
