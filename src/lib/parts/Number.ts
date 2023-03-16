import { oneOf, type ClassDescr } from "$lib/classes";
import type { Multiple } from "$lib/utils";

// const nrs = [null, 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
export interface ChildrenNumber {
	number?: Multiple;
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
	return oneOf({number, two ,three, four, five, six, seven, eight, nine, ten, eleven, twelve});
}