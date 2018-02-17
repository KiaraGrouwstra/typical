import { tsst, the } from 'tsst-tycho';
import { AppendList, ConcatLists, LengthList, ReverseList, FirstIndex, IncIndex, DecIndex, ZeroIndex, Prepend, ListTail, DifferenceLists } from './tuple';

describe(`tuple`, () => {

  describe(`AppendList`, () => {

    it(`the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, AppendList<{ 0: 'a', 1: 'b', length: 2 }, 'c'>>`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, AppendList<{ 0: 'a', 1: 'b', length: 2 }, 'c'>>();
      }).expectToCompile();
    });

  });

  describe(`ConcatLists`, () => {

    // it(`the<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, ConcatLists<{ 0: 'a', 1: 'b', length: 2 }, { 0: 'c', 1: 'd', length: 2 }>>`, () => {
    //   tsst(() => {
    //     the<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, ConcatLists<{ 0: 'a', 1: 'b', length: 2 }, { 0: 'c', 1: 'd', length: 2 }>>();
    //   }).expectToCompile();
    // });
    
    // ^ does not terminate

  });

  describe(`LengthList`, () => {

    it(`the<2, LengthList<{ 0: 'a', 1: 'b', length: 2 }>>`, () => {
      tsst(() => {
        the<2, LengthList<{ 0: 'a', 1: 'b', length: 2 }>>();
      }).expectToCompile();
    });

  });

  describe(`ReverseList`, () => {

    it(`the<{ 0: 'b', 1: 'a', length: 2 }, ReverseList<['a', 'b']>>`, () => {
      tsst(() => {
        the<{ 0: 'b', 1: 'a', length: 2 }, ReverseList<['a', 'b']>>();
      }).expectToCompile();
    });

  });

  describe(`FirstIndex`, () => {

    it(`the<2, FirstIndex<{ 2: 'a', 3: 'b' }>>`, () => {
      tsst(() => {
        the<2, FirstIndex<{ 2: 'a', 3: 'b' }>>();
      }).expectToCompile();
    });

  });

  describe(`IncIndex`, () => {

    // it(`the<{ 2: 'a', 3: 'b', length: 2 }, IncIndex<{ 0: 'a', 1: 'b', length: 2 }, 2>>`, () => {
    //   tsst(() => {
    //     the<{ 2: 'a', 3: 'b', length: 2 }, IncIndex<{ 0: 'a', 1: 'b', length: 2 }, 2>>();
    //   }).expectToCompile();
    // });

    // ^ does not terminate

  });

  describe(`DecIndex`, () => {

    it(`the<{ 0: 'a', 1: 'b', length: 2 }, DecIndex<{ 2: 'a', 3: 'b', length: 2 }, 2>>`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b', length: 2 }, DecIndex<{ 2: 'a', 3: 'b', length: 2 }, 2>>();
      }).expectToCompile();
    });
    // ^ error: { length: 2; }

  });

  describe(`ZeroIndex`, () => {

    it(`the<{ 0: 'a', 1: 'b', length: 2 }, ZeroIndex<{ 2: 'a', 3: 'b', length: 2 }>>`, () => {
      tsst(() => {
        the<{ 0: 'a', 1: 'b', length: 2 }, ZeroIndex<{ 2: 'a', 3: 'b', length: 2 }>>();
      }).expectToCompile();
    });
    // ^ error: { length: 2; }

  });

  describe(`Prepend`, () => {

    // it(`the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, Prepend<{ 0: 'b', 1: 'c', length: 2 }, 'a'>>`, () => {
    //   tsst(() => {
    //     the<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }, Prepend<{ 0: 'b', 1: 'c', length: 2 }, 'a'>>();
    //   }).expectToCompile();
    // });
    // // ^ error: { length: 2; }

  });

  describe(`ListTail`, () => {

    it(`the<'c', ListTail<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }>>`, () => {
      tsst(() => {
        the<'c', ListTail<{ 0: 'a', 1: 'b', 2: 'c', length: 3 }>>();
      }).expectToCompile();
    });

  });

  describe(`DifferenceLists`, () => {

    it(`the<{ 0: 'c', 1: 'd', length: 2 }, DifferenceLists<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, { 0: 123, 1: 456, length: 2 }>>`, () => {
      tsst(() => {
        the<{ 0: 'c', 1: 'd', length: 2 }, DifferenceLists<{ 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }, { 0: 123, 1: 456, length: 2 }>>();
      }).expectToCompile();
    });

  });

});
