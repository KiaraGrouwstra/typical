import { List } from '../util/List';

/**
 * Get the element of an array-like type.
 * @param R array type
 * @returns its element type
 */
export type ArrayProp<R extends List<any>> = R[-1];
