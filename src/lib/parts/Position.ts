import { argued } from "$lib/classes";

export interface Position {
	attached?: 'top'|'bottom'|'left'|'right'/*|'top left'|'top right'|'bottom left'|'bottom right'*/;
	fluid?: boolean;
	floated?: 'right'|'left';
}
export function position({attached, fluid, floated}: Position) {
	return [argued({attached, floated}), {fluid}];
}