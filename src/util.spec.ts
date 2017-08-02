import { the, If, The, Intersection } from './util';

the<number, 123>();

the<123, If<'1', 123, 456>>();
the<456, If<'0', 123, 456>>();

the<1 & 'a', Intersection<1, 'a'>>();
