import { ObjectHasStringIndex } from './ObjectHasStringIndex';
import { If } from '../util/If';
import { Obj } from '../util/Obj';
import { And } from '../boolean/And';
import { Not } from '../boolean/Not';
import { UnionsOverlap } from '../union/UnionsOverlap';
import { Matches } from '../type/Matches';

/**
 * Element access for object types. A `toString`-proof `T[K]`.
 * Should prevent 'toString' issues of O[K], but the current implementations of
 * UnionHasKey and UnionsOverlap won't suffice as they suffer from the same bug.
 * An alternative based on union iteration could potentially prevent this.
 */
// export type ObjectProp<O extends Obj<any>, K extends string, Default = never> = If<ObjectHasKeySafe<O, K>, O[K], Default>;
export type ObjectProp<O extends Obj<any>, K extends string> = If<
    And<
        UnionsOverlap<keyof O, 'toString' | 'toLocaleString'>,
        And<
            ObjectHasStringIndex<O>,
            Not<Matches<K, keyof O>>
        >
    >,
    O[string],
    O[K]
>;
