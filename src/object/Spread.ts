import { OptionalPropNames } from './OptionalPropNames';
import { SpreadProps } from '../object/SpreadProps';

/**
 * Type of `{ ...L, ...R }` / `Object.assign(L, R)`.
 */
export type Spread<L, R> =
    /** properties in L that don't exist in R */
      Pick<L, Exclude<keyof L, keyof R>>
    /** properties in R with types that exclude undefined */
    & Pick<R, Exclude<keyof R, OptionalPropNames<R>>>
    /** properties in R, with types that include undefined, that don't exist in L */
    & Pick<R, Exclude<OptionalPropNames<R>, keyof L>>
    /** properties in R, with types that include undefined, that exist in L */
    & SpreadProps<L, R, OptionalPropNames<R> & keyof L>;
