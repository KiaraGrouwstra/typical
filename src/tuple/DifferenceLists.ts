import { List } from '../util/List';
import { ListFrom } from '../array/ListFrom';
import { LengthList } from './LengthList';

/**
 * Filter a tuple-like type by stripping out any indices used in a second tuple-like.
 */
export type DifferenceLists<
  Big extends List<any>,
  Small extends List<any>
> = ListFrom<Big, LengthList<Small>>;
