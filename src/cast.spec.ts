import { the } from './util';
import { NumberToString, StringToNumber, TupleToUnion, TupleIndicesToUnion, TupleToObject, TupleToList, NumObjToList, ListToNumObj } from './cast';
import { TestArr } from './fixtures';

the<'3', NumberToString[3]>();
the<'3', NumberToString['3']>();
// the<'3', NumberToString<3>>();
the<string, NumberToString[number]>();

the<3, StringToNumber['3']>();
the<3, StringToNumber[3]>();
the<number, StringToNumber[string]>();
// ^ fixed by adding fallback `[k: string]: number;`, but causes a bunch of `Type 'StringToNumber[I]' cannot be used to index type ...`

the<"a" | "b" | "c", TupleToUnion<TestArr>>();

the<0 | 1 | 2, TupleIndicesToUnion<TestArr>>();

the<{ 0: "a"; 1: "b"; 2: "c"; }, TupleToObject<TestArr>>();

the<{ 0: "a"; 1: "b"; 2: "c"; length: 3; }, TupleToList<TestArr>>();

the<{ 0: 'a', 1: 'b', length: 2 }, NumObjToList<{ 0: 'a', 1: 'b' }>>();
the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, NumObjToList<TupleToObject<TestArr>>>();
// ^ error, #17456

the<{ 0: 'a', 1: 'b' }, ListToNumObj<{ 0: 'a', 1: 'b', length: 2 }>>();
