/**
 * just make an intersection type -- this wrapper helps to beat error
 * `Type ... does not satisfy the constraint ...`
 */
export type Intersection<A, B> = A & B;
