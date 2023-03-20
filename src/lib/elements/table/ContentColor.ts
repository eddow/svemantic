import type { ColorName } from "$svemantic/parts/Color";
import { oneOf, type ClassDescr } from "$svemantic/root";

export interface ContentColor {
	color?: ColorName;
	positive?: boolean;
	negative?: boolean;
	error?: boolean;
	warning?: boolean;
	active?: boolean;
}

export function contentColor({color, positive, negative, error, warning, active}: ContentColor): ClassDescr {
	return oneOf({color, positive, negative, error, warning, active});
}