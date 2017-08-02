import { the } from './util';
import { Vector, ArrayProp, TupleHasIndex, IsArrayType, AppendNumObj, ConcatNumObjs, Length,
IncIndexNumbObj, ListFrom, ListTo, Reverse, TupleLastElem, TupleLastIndex, FirstElem, TupleFirstIndex } from './array';
import { TupleToObject } from './cast';
import { NumArr, TestArr } from './fixtures';

the<{ 0: number, 1: number, 2: number, length: 3 }, Vector<number, 3>>();

the<0, ArrayProp<Array<0>>>();

// the<0, TupleProp<[0], 0>>();
// the<0, TupleProp<[0], 1>>();
// // the<any, TupleProp<[], 0>>(); // A tuple type element list cannot be empty.
// the<number, TupleProp<number[], 0>>();

the<'1', TupleHasIndex<NumArr, 1>>();
the<'0', TupleHasIndex<NumArr, -1>>();
// the<'1', TupleHasIndex<{a:1}, 'a'>>();
// the<'0', TupleHasIndex<{a:1}, 'b'>>();
// the<'1', TupleHasIndex<{ 1: "hi" }, 1>>();
// the<'0', TupleHasIndex<{ 1: "hi" }, -1>>();

the<'1', IsArrayType<NumArr>>();
the<'1', IsArrayType<any[]>>();
the<'1', IsArrayType<{ length: 2 }>>();
// ^ all error: 0

the<{ 0: 'a', 1: 'b', 2: 'c' }, AppendNumObj<{ 0: 'a', 1: 'b' }, 'c'>>();
// ^ error: missing prop 2

the<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd' }, ConcatNumObjs<{ 0: 'a', 1: 'b' }, { 0: 'c', 1: 'd' }>>();
// ^ error: missing prop 2

the<3, Length<TupleToObject<TestArr>>>();
the<3, Length<TestArr>>();
the<0, Length<any[]>>();
the<2, Length<{ 0: 'a', 1: 'b' }>>();

// the<{ 2: 'a', 3: 'b', length: 2 }, IncIndexNumbObj<{ 0: 'a', 1: 'b' }, 2>>();
// // ^ does not terminate?

// the<{ 0: 'c', 1: 'd', length: 2 }, ListFrom<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, 2>>();
// // ^ does not terminate?

the<{ 0: 'a', 1: 'b', length: 2 }, ListTo<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, 2>>();
// ^ error: { length: 2; }

the<{ 0: 'b', 1: 'a', length: 2 }, Reverse<['a', 'b']>>();

the<'c', TupleLastElem<TestArr>>();

the<2, TupleLastIndex<TestArr>>();
the<-1, TupleLastIndex<any[]>>();

the<'a', FirstElem<TestArr>>();

the<0, TupleFirstIndex<TestArr>>();
// ^ error: 1
