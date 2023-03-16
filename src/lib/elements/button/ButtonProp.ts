import { position, type Position } from "$lib/parts/Position";
import { color, type Color } from "$lib/parts/Color";
import { size, type Size } from "$lib/parts/Size";

export interface ButtonProp extends Position, Color, Size {
	basic?: boolean;
	fluid?: boolean;
	disabled?: boolean;
	compact?: boolean;
}

export function buttonProp({basic, disabled, compact, ...props}: ButtonProp) {
	return [{basic, disabled, compact}, position(props), color(props), size(props)];
}
