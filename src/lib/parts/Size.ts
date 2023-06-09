import { oneOf, type ClassDescr } from "$svemantic/root";

export interface Size {
	size?: 'mini'|'tiny'|'small'|'medium'|'large'|'big'|'huge'|'massive';
	mini?: boolean;
	tiny?: boolean;
	small?: boolean;
	medium?: boolean;
	large?: boolean;
	big?: boolean;
	huge?: boolean;
	massive?: boolean;
}

export function size({size, mini, tiny, small, medium, large, big, huge, massive}: Size): ClassDescr {
	return oneOf({size, mini, tiny, small, medium, large, big, huge, massive});
}

export interface SmallLarge {
	size?: 'small'|'large';
	small?: boolean;
	large?: boolean;
}

export function smallLarge({size, small, large}: Size): ClassDescr {
	return oneOf({size, small, large});
}