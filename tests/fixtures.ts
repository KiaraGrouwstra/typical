export type NumArr = [1,2,3];
export type TestArr = ['a','b','c'];
export interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
}
