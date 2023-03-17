import { oneOf, type ClassDescr } from "$lib/root";

export type Multiple = 'two'|'three'|'four'|'five'|'six'|'seven'|'eight'|'nine'|'ten'|'eleven'|'twelve';
const nrs = [null, 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
export interface ChildrenNumber {
	number?: number|Multiple;
	two?: boolean;
	three?: boolean;
	four?: boolean;
	five?: boolean;
	six?: boolean;
	seven?: boolean;
	eight?: boolean;
	nine?: boolean;
	ten?: boolean;
	eleven?: boolean;
	twelve?: boolean;
}

export function childrenNumber({number, two ,three, four, five, six, seven, eight, nine, ten, eleven, twelve}: ChildrenNumber): ClassDescr {
	return oneOf({number: number!== undefined && (typeof number === 'number' ? nrs[number] || undefined : number), two ,three, four, five, six, seven, eight, nine, ten, eleven, twelve});
}