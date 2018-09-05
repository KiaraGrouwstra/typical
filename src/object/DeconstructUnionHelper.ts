export type DeconstructUnionHelper<T> = T &
  Partial<
    Pick<
      UnionToIntersection<T>,
      Exclude<
        keyof UnionToIntersection<T>,
        keyof T
      >
    >
  >;
