import { combine, oneOf, type ClassDescr } from "$svemantic/root";

export type ColorName = 'red'|'orange'|'yellow'|'olive'|'green'|'teal'|'blue'|'violet'|'purple'|'pink'|'brown'|'grey'|'black';
export interface Color {
	color?: ColorName;
	primary?: boolean;
	secondary?: boolean;
	positive?: boolean;
	negative?: boolean;
	inverted?: boolean;
}

export function color({color, primary, secondary, positive, negative, inverted}: Color): ClassDescr {
	return combine([oneOf({color, primary, secondary, positive, negative}), {inverted}]);
}