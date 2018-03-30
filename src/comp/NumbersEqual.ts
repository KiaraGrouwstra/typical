import { NumberToString } from '../cast/NumberToString';
import { StringsEqual } from '../comp/StringsEqual';
import { DefinitelyYes } from '../boolean/DefinitelyYes';

/**
 * Check whether two number literal types are equivalent.
 * @deprecated ditch for Matches
*/
export type NumbersEqual<
  A extends number,
  B extends number
> = DefinitelyYes<StringsEqual<
  NumberToString[A],
  NumberToString[B]
>>;
