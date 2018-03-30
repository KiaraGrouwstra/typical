/**
 * Get the parameter types of a function.
 */
export type Arguments<T extends (...args: any[]) => any> =
    T extends () => any ? never[] :
    T extends (a: infer A) => any ? [A] :
    T extends (a: infer A, b: infer B) => any ? [A, B] :
    T extends (a: infer A, b: infer B, c: infer C) => any ? [A, B, C] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D) => any ? [A, B, C, D] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E) => any ? [A, B, C, D, E] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F) => any ? [A, B, C, D, E, F] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G) => any ? [A, B, C, D, E, F, G] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H) => any ? [A, B, C, D, E, F, G, H] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H, i: infer I) => any ? [A, B, C, D, E, F, G, H, I] :
    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H, i: infer I, j: infer J) => any ? [A, B, C, D, E, F, G, H, I, J] :
    never[];
