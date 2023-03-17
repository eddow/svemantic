import { oneOf, type ClassDescr } from "$lib/root";

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