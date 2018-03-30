import { List } from '../util/List';

/** 
 * Get the element of a tuple-like type at the given index. Not useful, just use `tpl[i]`.
 * @param Arr tuple-like type
 * @param I the index to check
 * @returns element type
 */
export type TupleProp<Arr extends List<any>, I extends number> = Arr[I];
