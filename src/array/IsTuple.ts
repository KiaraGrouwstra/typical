import { And } from '../boolean/And';
import { IsArrayType } from './IsArrayType';
import { InstanceOf } from '../type/InstanceOf';

/**
 * Check whether a type is a tuple type
 */
export type IsTuple<T extends { length: number }> = And<IsArrayType<T>, InstanceOf<T['length'], number>>;
