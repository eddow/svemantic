import { oneOf, type ClassDescr } from "$lib/root";

export interface Color {
	color?: 'red'|'orange'|'yellow'|'olive'|'green'|'teal'|'blue'|'violet'|'purple'|'pink'|'brown'|'grey'|'black';
	primary?: boolean;
	secondary?: boolean;
	positive?: boolean;
	negative?: boolean;
	inverted?: boolean;
}

export function color({color, primary, secondary, positive, negative, inverted}: Color): ClassDescr {
	return [oneOf({color, primary, secondary, positive, negative}), {inverted}];
}