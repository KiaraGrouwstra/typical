import { the } from './util';
import { Inc, Dec, Add, Subtract, Mult, Pow /*, DivFloor, Modulo*/ } from './number';

the<2, Inc[1]>();

the<1, Dec[2]>();

the<5, Add<3, 2>>();

the<1, Subtract<3, 2>>();

the<6, Mult<3, 2>>();

the<9, Pow<3, 2>>();
the<8, Pow<2, 3>>();

// the<2, DivFloor<5, 2>>();

// the<1, Modulo<5, 2>>();
