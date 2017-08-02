import { the } from './util';
import { Not, And, Or, Indeterminate, Determinate, DefinitelyYes, DefinitelyNo } from './boolean';

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

// the<'1', UnionHasKey<'0'|'1','0'>>();
// the<'1', UnionHasKey<'0'|'1','1'>>();
// the<'1', UnionHasKey<'0'|'1','0'> | UnionHasKey<'0'|'1','1'>>();
// the<'1', And<UnionHasKey<'0'|'1','0'>, UnionHasKey<'0'|'1','1'>>>();
the<'1', Indeterminate<'0'|'1'>>();
// ^ broke, along with dependents!
// ^ regression in recent TS?
the<'0', Indeterminate<'0'>>();
the<'0', Indeterminate<'1'>>();

the<'0', Determinate<'0'|'1'>>();
the<'1', Determinate<'0'>>();
the<'1', Determinate<'1'>>();

the<'0', DefinitelyYes<'0'|'1'>>();
the<'0', DefinitelyYes<'0'>>();
the<'1', DefinitelyYes<'1'>>();

the<'0', DefinitelyNo<'0'|'1'>>();
the<'1', DefinitelyNo<'0'>>();
the<'0', DefinitelyNo<'1'>>();
