// type ApplyFns<Fs extends List<(...args: any[]) => any>, V> = {
//   '1': Fs['length'] extends 0 ? V : ApplyFns<ListFrom<Fs, 1>, Fs[0](V)>
// }[V extends number ? '1' : '1'];
