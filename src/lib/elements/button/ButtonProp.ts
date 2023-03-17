import { position, type Position } from "$lib/parts/Position";
import { color, type Color } from "$lib/parts/Color";
import { size, type Size } from "$lib/parts/Size";
import { argued } from "$lib/root";

export interface ButtonProp extends Position, Color, Size {
	basic?: boolean;
	fluid?: boolean;
	disabled?: boolean;
	compact?: boolean;
	floated?: 'right'|'left';
}

export function buttonProp({basic, disabled, compact, floated, ...props}: ButtonProp) {
	return [{basic, disabled, compact}, argued({floated}), position(props), color(props), size(props)];
}
