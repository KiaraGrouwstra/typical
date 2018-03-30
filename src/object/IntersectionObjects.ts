import { IntersectionObjectKeys } from './IntersectionObjectKeys';

/**
 * Filter an object based on the keys present in another object.
 */
export type IntersectionObjects<A, B> = Pick<A, IntersectionObjectKeys<A, B>>;
