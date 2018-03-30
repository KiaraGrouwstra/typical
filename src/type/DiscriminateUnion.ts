/**
 * Get the constituent of a tagged union given the value of the discriminant.
 * @see https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-364982638
 */
export type DiscriminateUnion<
  Union,
  TagKey extends keyof Union,
  TagValue extends Union[TagKey]
> = Union extends Record<TagKey, TagValue> ? Union : never;
