// @flow
import { tsst, the } from 'tsst-tycho';
import { NumberToString, StringToNumber, TupleToUnion, TupleIndicesToUnion, TupleToObject, TupleToList, NumObjToList, ListToNumObj } from './cast';
import { TestArr } from './fixtures';

describe(`cast`, () => {

  describe(`NumberToString`, () => {

    it(`the<'3', NumberToString[3]>()`, () => {
      tsst(() => {
        the<'3', NumberToString[3]>();
      }).expectToCompile();
    });

    it(`the<'3', NumberToString['3']>()`, () => {
      tsst(() => {
        the<'3', NumberToString['3']>();
      }).expectToCompile();
    });

    it(`the<'3', NumberToString<3>>()`, () => {
      tsst(() => {
        the<'3', NumberToString<3>>();
      }).expectToFail();
    });

    it(`the<string, NumberToString[number]>()`, () => {
      tsst(() => {
        the<string, NumberToString[number]>();
      }).expectToCompile();
    });

  });

  describe(`StringToNumber`, () => {

    it(`the<3, StringToNumber['3']>()`, () => {
      tsst(() => {
        the<3, StringToNumber['3']>();
      }).expectToCompile();
    });

    it(`the<3, StringToNumber[3]>()`, () => {
      tsst(() => {
        the<3, StringToNumber[3]>();
      }).expectToCompile();
    });

    it(`the<number, StringToNumber[string]>()`, () => {
      tsst(() => {
        the<number, StringToNumber[string]>();
      }).expectToCompile();
    });

  });

  describe(`TupleToUnion`, () => {

    it(`the<"a" | "b" | "c", TupleToUnion<TestArr>>()`, () => {
      tsst(() => {
        the<"a" | "b" | "c", TupleToUnion<TestArr>>();
      }).expectToCompile();
    });

  });

  describe(`TupleIndicesToUnion`, () => {

    it(`the<0 | 1 | 2, TupleIndicesToUnion<TestArr>>()`, () => {
      tsst(() => {
        the<0 | 1 | 2, TupleIndicesToUnion<TestArr>>();
      }).expectToCompile();
    });

  });

  describe(`TupleToObject`, () => {

    it(`the<{ 0: "a"; 1: "b"; 2: "c"; }, TupleToObject<TestArr>>()`, () => {
      tsst(() => {
        the<{ 0: "a"; 1: "b"; 2: "c"; }, TupleToObject<TestArr>>();
      }).expectToCompile();
    });

  });

  describe(`TupleToList`, () => {

    it(`the<{ 0: "a"; 1: "b"; 2: "c"; length: 3; }, TupleToList<TestArr>>()`, () => {
      tsst(() => {
        the<{ 0: "a"; 1: "b"; 2: "c"; length: 3; }, TupleToList<TestArr>>();
      }).expectToCompile();
    });

  });

  describe(`NumObjToList`, () => {

    it(`the<{ 0: 'a', 1: 'b', length: 2 }, NumObjToList<{ 0: 'a', 1: 'b' }>>()`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b', length: 2 }, NumObjToList<{ 0: 'a', 1: 'b' }>>();
      }).expectToCompile();
    });

    it(`the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, NumObjToList<TupleToObject<TestArr>>>()`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, NumObjToList<TupleToObject<TestArr>>>();
      }).expectToCompile();
    });

  });

  describe(`ListToNumObj`, () => {

    it(`the<{ 0: 'a', 1: 'b' }, ListToNumObj<{ 0: 'a', 1: 'b', length: 2 }>>()`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b' }, ListToNumObj<{ 0: 'a', 1: 'b', length: 2 }>>();
      }).expectToCompile();
    });

  });

});
