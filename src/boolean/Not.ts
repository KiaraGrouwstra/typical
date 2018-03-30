import { Bool } from '../util/Bool';

/**
 * Inverts a string-based boolean (`'0'` / `'1'`).
 */
export type Not<T extends Bool> = { '1': '0'; '0': '1'; }[T];
