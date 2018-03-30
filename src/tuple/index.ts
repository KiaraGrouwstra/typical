export { AppendList } from './AppendList';
export { ConcatLists } from './ConcatLists';
export { DecIndex } from './DecIndex';
export { DifferenceLists } from './DifferenceLists';
export { IncIndex } from './IncIndex';
export { LengthList } from './LengthList';
export { ListTail } from './ListTail';
export { Prepend } from './Prepend';
export { ReverseList } from './ReverseList';
export { ZeroIndex } from './ZeroIndex';

/**
 * type operations for 'lists' -- numerically-indexed types (tuple/object) with explicit `length`.
 * outputs are not tuple types but similar 'list' objects, because we can't manipulate tuples yet.
 * 
 * Examples:
 * - `[number, string]` (tuple: fixed-length array)
 * - `{ 0: number, 1: string, length: 2 }` (`ArrayLike` with known `length`, which includes tuples)
 * 
 * @preferred
 */
