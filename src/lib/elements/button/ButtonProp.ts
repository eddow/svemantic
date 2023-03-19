import { position, type Position } from "$svemantic/parts/Position";
import { color, type Color } from "$svemantic/parts/Color";
import { size, type Size } from "$svemantic/parts/Size";
import { argued } from "$svemantic/root";

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
