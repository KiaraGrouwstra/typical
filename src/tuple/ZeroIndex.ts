import { List } from '../util/List';
import { If } from '../util/If';
import { NumberToString } from '../cast/NumberToString';
import { ObjectHasKey } from '../object/ObjectHasKey';
import { DecIndex } from './DecIndex';

/**
 * Decrease the indexes on a numerically indexed object such an amount as
 * to lower the first one to `0`.
 */
export type ZeroIndex<R extends List<any>, I extends number = R[0]> = If<ObjectHasKey<R, NumberToString[0]>, R, DecIndex<R, I, I>>;
