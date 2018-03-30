import { NumObj } from '../util/NumObj';
import { Inc } from '../number/Inc';
import { ObjectHasKey } from '../object/ObjectHasKey';
import { NumberToString } from '../cast/NumberToString';

/**
 * Get the length of a tuple-like without specified `length`, e.g. for object types with numerical keys
 */
export type Length<R extends NumObj<any>, I extends number = 0> =
  { 1: Length<R, Inc[I]>, 0: I }[ObjectHasKey<R, NumberToString[I]>];
