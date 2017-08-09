import { the, Bool } from './util';
import { Not, And, Or, Indeterminate, Determinate, DefinitelyYes, DefinitelyNo } from './boolean';

the<'1', Not<'0'>>();
the<'0', Not<'1'>>();
// the<Bool, Not<'2'>>(); // InvalidNotParam
// the<'0', Not<'true'>>();
// the<'1', Not<'false'>>();
// the<never, Not<any>>(); // InvalidNotParam
the<Bool, Not<never>>(); // any
// the<'0', Not<true>>(); // any
// the<'1', = Not<false>>(); // any

the<'1', And<'1', '1'>>();
the<'0', And<'0', '1'>>();

the<'1', Or<'1', '0'>>();
the<'0', Or<'0', '0'>>();

// the<'1', UnionHasKey<Bool,'0'>>();
// the<'1', UnionHasKey<Bool,'1'>>();
// the<'1', UnionHasKey<Bool,'0'> | UnionHasKey<Bool,'1'>>();
// the<'1', And<UnionHasKey<Bool,'0'>, UnionHasKey<Bool,'1'>>>();
the<'1', Indeterminate<Bool>>();
// ^ broke, along with dependents!
// ^ regression in recent TS?
the<'0', Indeterminate<'0'>>();
the<'0', Indeterminate<'1'>>();

the<'0', Determinate<Bool>>();
the<'1', Determinate<'0'>>();
the<'1', Determinate<'1'>>();

the<'0', DefinitelyYes<Bool>>();
the<'0', DefinitelyYes<'0'>>();
the<'1', DefinitelyYes<'1'>>();

the<'0', DefinitelyNo<Bool>>();
the<'1', DefinitelyNo<'0'>>();
the<'0', DefinitelyNo<'1'>>();
