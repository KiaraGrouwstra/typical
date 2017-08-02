import { the } from './util';
import { Not, And, Or, BEq, Neq } from './boolean';

the<'1', Not<'0'>>();
the<'0', Not<'1'>>();
// the<'0'|'1', Not<'2'>>(); // InvalidNotParam
// the<'0', Not<'true'>>();
// the<'1', Not<'false'>>();
// the<never, Not<any>>(); // InvalidNotParam
the<'0'|'1', Not<never>>(); // any
// the<'0', Not<true>>(); // any
// the<'1', = Not<false>>(); // any

the<'1', And<'1', '1'>>();
the<'0', And<'0', '1'>>();

the<'1', Or<'1', '0'>>();
the<'0', Or<'0', '0'>>();

the<'1', BEq<'0', '0'>>();
the<'0', BEq<'0', '1'>>();
the<'0', BEq<'1', '0'>>();
the<'1', BEq<'1', '1'>>();

the<'0', Neq<'0', '0'>>();
the<'1', Neq<'0', '1'>>();
the<'1', Neq<'1', '0'>>();
the<'0', Neq<'1', '1'>>();
