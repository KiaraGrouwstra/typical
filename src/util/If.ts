import { Bool } from './Bool';

/**
 * Type-level equivalent of ternary operator `a ? b : c`.
 * Seems good for recursion, but a type can't reference itself in the top layer.
 */
export type If<Cond extends Bool, Then, Else> = { 1: Then, 0: Else }[Cond];
