import { the } from './util';
import { StringsEqual, NumbersEqual, Gt, Lt, Gte, Lte /*, Max, Min*/ } from './comp';

the<'1', StringsEqual<'a', 'a'>>();
the<'0', StringsEqual<'a', 'b'>>();
// type NumbersEqual<A extends number, B extends number> = ObjectHasKey<{ [P in NumberToString[A]]: 'hi' }, NumberToString[B]>;

the<'1', NumbersEqual<123, 123>>();
the<'0', NumbersEqual<123, 456>>();
// the<'1', NumbersEqual<123, '123'>>(); // numbers only
// the<'1', NumbersEqual<'123', 123>>(); // numbers only
the<'0', NumbersEqual<0, 5>>();
the<'0', NumbersEqual<5, 0>>();

the<'1', Gt<3, 2>>();
the<'0', Gt<2, 3>>();
the<'0', Gt<3, 3>>();

the<'0', Lt<3, 2>>();
the<'1', Lt<2, 3>>();
the<'0', Lt<3, 3>>();

the<'1', Gte<3, 2>>();
the<'0', Gte<2, 3>>();
the<'1', Gte<3, 3>>();

the<'0', Lte<3, 2>>();
the<'1', Lte<2, 3>>();
the<'1', Lte<3, 3>>();

// the<6, Max<3, 6>>();
// the<5, Max<5, 2>>();

// the<3, Min<3, 6>>();
// the<2, Min<5, 2>>();

