import { tsst, the } from 'tsst';
import { And } from './boolean';

describe(`repros`, () => {

    it(`16018`, () => {
      tsst(() => {
        type Inc = [1, 2, 3, 4, 5];
        type ObjectHasKey<O extends {}, K extends string> = ({[K in keyof O]: '1' } & { [k: string]: '0' })[K];
        type Length<R extends {}, I extends number = 0> = { 1: Length<R, Inc[I]>, 0: I }[ObjectHasKey<R, I>];
        type TestLenA = Length<{ 0: 'a', 1: 'b' }>;
        // ^ ok, 2
        type Wrap<O> = Length<O>;
        // type Wrap<O, Len extends Length<O> = Length<O>> = Len;
        // ^ old work-around, same result here
        the<2, Wrap<{ 0: 'a', 1: 'b' }>>;
        // ^ 0 :(
      }).expectToCompile();
    });

    it(`17908`, () => {
      tsst(() => {
        type Valueof<T> = T[keyof T];
        type MappedKeyof<T> = {
          [K in keyof T]: keyof T[K]
        }
        type Foo = {
          one: { prop1: string },
          two: { prop2: number }
        }
        the<'prop1' | 'prop2', Valueof<MappedKeyof<Foo>>>();
        // hey, this "union of keys of properties of" operation would be useful for me,
        // let's define the composition as follows:
        type KeyofPropertyof<T> = Valueof<MappedKeyof<T>>;
        // apply it to foo, and... it is broken!
        type KeyofPropertyofFooBroken = KeyofPropertyof<Foo>; // never; broken
        the<'prop1' | 'prop2', Valueof<KeyofPropertyof<Foo>>>();
        the<Valueof<KeyofPropertyof<Foo>>, 'prop1' | 'prop2'>();
        // something is very wrong here, `never` should explode in the last case yet doesn't
      // }).expectToCompile();
      }).expectToFailWith('never does not satisfy');
    });

});
