import { the } from './util';
import { AppendList, ConcatLists, LengthList, ReverseList, FirstIndex, IncIndex, DecIndex, ZeroIndex, Prepend, ListTail, DifferenceLists } from './list';

the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, AppendList<{ 0: 'a', 1: 'b', length: 2 }, 'c'>>();

the<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, ConcatLists<{ 0: 'a', 1: 'b', length: 2 }, { 0: 'c', 1: 'd', length: 2 }>>();
// ^ error, fails

the<2, LengthList<{ 0: 'a', 1: 'b', length: 2 }>>();

the<{ 0: 'b', 1: 'a', length: 2 }, ReverseList<['a', 'b']>>();

the<2, FirstIndex<{ 2: 'a', 3: 'b' }>>();

// the<{ 2: 'a', 3: 'b', length: 2 }, IncIndex<{ 0: 'a', 1: 'b', length: 2 }, 2>>();
// ^ won't terminate?

the<{ 0: 'a', 1: 'b', length: 2 }, DecIndex<{ 2: 'a', 3: 'b', length: 2 }, 2>>();
// ^ error: { length: 2; }

the<{ 0: 'a', 1: 'b', length: 2 }, ZeroIndex<{ 2: 'a', 3: 'b', length: 2 }>>();
// ^ error: { length: 2; }

the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, Prepend<{ 0: 'b', 1: 'c', length: 2 }, 'a'>>();
// ^ error: { length: 2; }

the<'c', ListTail<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }>>();
// ^ error: { length: -1; }

// the<{ 0: 'c', 1: 'd', length: 2 }, DifferenceLists<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, { 0: 123, 1: 456, length: 2 }>>();
// ^ won't terminate?
