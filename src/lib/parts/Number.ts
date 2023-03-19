import { oneOf, type ClassDescr } from "$svemantic/root";

export type Multiple = 'two'|'three'|'four'|'five'|'six'|'seven'|'eight'|'nine'|'ten'|'eleven'|'twelve'|'thirteen'|'fourteen'|'fifteen'|'sixteen';
const nrs = [null, 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];
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
	thirteen?: boolean;
	fourteen?: boolean;
	fifteen?: boolean;
	sixteen?: boolean;
}

export function childrenNumber(key?: string) {
	return ({number, two ,three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen}: ChildrenNumber): ClassDescr =>{
		const nr = oneOf({
			number: number!== undefined && (typeof number === 'number' ? nrs[number] || undefined : number),
			two ,three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen
		});
		return nr && key ? nr + ' ' + key : nr;
	}
}