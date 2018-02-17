import { tsst, the } from 'tsst-tycho';
import { Vector, ArrayProp, TupleHasIndex, IsArrayType, AppendNumObj, ConcatNumObjs, Length, TupleProp,
IncIndexNumbObj, ListFrom, ListTo, Reverse, TupleLastElem, TupleLastIndex, FirstElem, TupleFirstIndex, IsTuple } from '../src/array';
import { TupleToObject } from '../src/cast';
import { NumArr, TestArr } from './fixtures';
Error.stackTraceLimit = 0;

describe(`array`, () => {

  describe(`Vector`, () => {

    it(`the<{ 0: number, 1: number, 2: number, length: 3 }, Vector<number, 3>>`, () => {
      tsst(() => {
        the<{ 0: number, 1: number, 2: number, length: 3 }, Vector<number, 3>>();
      }).expectToCompile();
    });

    it(`the<Vector<number | string, 3>, { 0: number, 1: number, 2: number, length: 3 } | { 0: string, 1: string, 2: string, length: 3 }>`, () => {
      tsst(() => {
        the<Vector<number | string, 3>, { 0: number, 1: number, 2: number, length: 3 } | { 0: string, 1: string, 2: string, length: 3 }>();
      }).expectToCompile();
    });

    it(`the<{ 0: number | string, 1: number | string, 2: number | string, length: 3 }, Vector<number | string, 3>>`, () => {
      tsst(() => {
        the<{ 0: number | string, 1: number | string, 2: number | string, length: 3 }, Vector<number | string, 3>>();
      }).expectToCompile();
    });

    it(`the<{ 0: number, 1: number, length: 2 } | { 0: number, 1: number, 2: number, length: 3 }, Vector<number, 2 | 3>>`, () => {
      tsst(() => {
        the<{ 0: number, 1: number, length: 2 } | { 0: number, 1: number, 2: number, length: 3 }, Vector<number, 2 | 3>>();
      }).expectToCompile();
    });

  });

  describe(`ArrayProp`, () => {

    it(`the<0, ArrayProp<Array<0>>>`, () => {
      tsst(() => {
        the<0, ArrayProp<Array<0>>>();
      }).expectToCompile();
    });

    it(`the<0 | 1, ArrayProp<Array<0 | 1>>>`, () => {
      tsst(() => {
        the<0 | 1, ArrayProp<Array<0 | 1>>>();
      }).expectToCompile();
    });

    it(`the<0 | 1, ArrayProp<Array<0> | Array<1>>>`, () => {
      tsst(() => {
        the<0 | 1, ArrayProp<Array<0> | Array<1>>>();
      }).expectToCompile();
    });

  });

  describe(`TupleProp`, () => {

    it(`the<0, TupleProp<[0], 0>>`, () => {
      tsst(() => {
        the<0, TupleProp<[0], 0>>();
      }).expectToCompile();
    });

    it(`the<0, TupleProp<[0], 1>>`, () => {
      tsst(() => {
        the<0, TupleProp<[0], 1>>();
      }).expectToCompile();
    });

    it(`the<number, TupleProp<number[], 0>>`, () => {
      tsst(() => {
        the<number, TupleProp<number[], 0>>();
      }).expectToCompile();
    });

  });

  describe(`TupleHasIndex`, () => {

    it(`the<'1', TupleHasIndex<NumArr, 1>>`, () => {
      tsst(() => {
        the<'1', TupleHasIndex<NumArr, 1>>();
      }).expectToCompile();
    });

    it(`the<'0', TupleHasIndex<NumArr, -1>>`, () => {
      tsst(() => {
        the<'0', TupleHasIndex<NumArr, -1>>();
      }).expectToCompile();
    });

    it(`the<'0'|'1', TupleHasIndex<NumArr, -1|1>>`, () => {
      tsst(() => {
        the<'0'|'1', TupleHasIndex<NumArr, -1|1>>();
      }).expectToCompile();
    });

    it(`the<'0'|'1', TupleHasIndex<NumArr | ['a'], 1>>`, () => {
      tsst(() => {
        the<'0'|'1', TupleHasIndex<NumArr | ['a'], 1>>();
      }).expectToCompile();
    });

    it(`the<'1', TupleHasIndex<{a:1}, 'a'>>`, () => {
      tsst(() => {
        the<'1', TupleHasIndex<{a:1}, 'a'>>();
      }).expectToFail();
    });

    it(`the<'0', TupleHasIndex<{a:1}, 'b'>>`, () => {
      tsst(() => {
        the<'0', TupleHasIndex<{a:1}, 'b'>>();
      }).expectToFail();
    });

    it(`the<'1', TupleHasIndex<{ 1: "hi" }, 1>>`, () => {
      tsst(() => {
        the<'1', TupleHasIndex<{ 1: "hi" }, 1>>();
      }).expectToFail();
    });

    it(`the<'0', TupleHasIndex<{ 1: "hi" }, -1>>`, () => {
      tsst(() => {
        the<'0', TupleHasIndex<{ 1: "hi" }, -1>>();
      }).expectToFail();
    });

    // ^ no objects

  });

  describe(`IsArrayType`, () => {

    it(`the<'1', IsArrayType<NumArr>>`, () => {
      tsst(() => {
        the<'1', IsArrayType<NumArr>>();
      }).expectToCompile();
    });

    it(`the<'1', IsArrayType<any[]>>`, () => {
      tsst(() => {
        the<'1', IsArrayType<any[]>>();
      }).expectToCompile();
    });

    it(`the<'0', IsArrayType<{ length: 2 }>>`, () => {
      tsst(() => {
        the<'0', IsArrayType<{ length: 2 }>>();
      }).expectToCompile();
    });

  });

  describe(`AppendNumObj`, () => {

    it(`the<{ 0: 'a', 1: 'b', 2: 'c' }, AppendNumObj<{ 0: 'a', 1: 'b' }, 'c'>>`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b', 2: 'c' }, AppendNumObj<{ 0: 'a', 1: 'b' }, 'c'>>();
      }).expectToCompile();
    });

  });

  describe(`ConcatNumObjs`, () => {

    it(`the<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd' }, ConcatNumObjs<{ 0: 'a', 1: 'b' }, { 0: 'c', 1: 'd' }>>`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd' }, ConcatNumObjs<{ 0: 'a', 1: 'b' }, { 0: 'c', 1: 'd' }>>();
      }).expectToCompile();
    });

    // ^ does not terminate

  });

  describe(`Length`, () => {

    it(`the<3, Length<TupleToObject<TestArr>>>`, () => {
      tsst(() => {
        the<3, Length<TupleToObject<TestArr>>>();
      }).expectToCompile();
    });

    it(`the<3, Length<TestArr>>`, () => {
      tsst(() => {
        the<3, Length<TestArr>>();
      }).expectToCompile();
    });

    it(`the<0, Length<any[]>>`, () => {
      tsst(() => {
        the<0, Length<any[]>>();
      }).expectToCompile();
    });

    it(`the<2, Length<{ 0: 'a', 1: 'b' }>>`, () => {
      tsst(() => {
        the<2, Length<{ 0: 'a', 1: 'b' }>>();
      }).expectToCompile();
    });

    it(`the<0|3, Length<any[]|TestArr>>`, () => {
      tsst(() => {
        the<0|3, Length<any[]|TestArr>>();
      }).expectToCompile();
    });

  });

  describe(`IncIndexNumbObj`, () => {

    it(`the<{ 2: 'a', 3: 'b', length: 2 }, IncIndexNumbObj<{ 0: 'a', 1: 'b' }, 2>>`, () => {
      tsst(() => {
        the<{ 2: 'a', 3: 'b', length: 2 }, IncIndexNumbObj<{ 0: 'a', 1: 'b' }, 2>>();
      }).expectToCompile();
    });

    // ^ does not terminate

  });

  describe(`ListFrom`, () => {

    it(`the<{ 0: 'c', 1: 'd', length: 2 }, ListFrom<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, 2>>`, () => {
      tsst(() => {
        the<{ 0: 'c', 1: 'd', length: 2 }, ListFrom<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, 2>>();
      }).expectToCompile();
    });

  });

  describe(`ListTo`, () => {

    it(`the<{ 0: 'a', 1: 'b', length: 2 }, ListTo<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, 2>>`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b', length: 2 }, ListTo<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, 2>>();
      }).expectToCompile();
    });
    // ^ error: { length: 2; }

  });

  describe(`Reverse`, () => {

    it(`the<{ 0: 'b', 1: 'a', length: 2 }, Reverse<['a', 'b']>>`, () => {
      tsst(() => {
        the<{ 0: 'b', 1: 'a', length: 2 }, Reverse<['a', 'b']>>();
      }).expectToCompile();
    });

  });

  describe(`TupleLastElem`, () => {

    it(`the<'c', TupleLastElem<TestArr>>`, () => {
      tsst(() => {
        the<'c', TupleLastElem<TestArr>>();
      }).expectToCompile();
    });

  });

  describe(`TupleLastIndex`, () => {

    it(`the<2, TupleLastIndex<TestArr>>`, () => {
      tsst(() => {
        the<2, TupleLastIndex<TestArr>>();
      }).expectToCompile();
    });

    it(`the<-1, TupleLastIndex<any[]>>`, () => {
      tsst(() => {
        the<-1, TupleLastIndex<any[]>>();
      }).expectToCompile();
    });

  });

  describe(`FirstElem`, () => {

    it(`the<'a', FirstElem<TestArr>>`, () => {
      tsst(() => {
        the<'a', FirstElem<TestArr>>();
      }).expectToCompile();
    });

  });

  describe(`TupleFirstIndex`, () => {

    it(`the<0, TupleFirstIndex<TestArr>>`, () => {
      tsst(() => {
        the<0, TupleFirstIndex<TestArr>>();
      }).expectToCompile();
    });

    // ^ error: 1

  });

  describe(`IsTuple`, () => {

    it(`the<'1', IsTuple<[0]>>`, () => {
      tsst(() => {
        the<'1', IsTuple<[0]>>();
      }).expectToCompile();
    });

    it(`the<'0', IsTuple<string[]>>`, () => {
      tsst(() => {
        the<'0', IsTuple<string[]>>();
      }).expectToCompile();
    });

  });

});
