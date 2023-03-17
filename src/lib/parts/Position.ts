import { argued } from "$lib/classes";

export interface Position {
	attached?: 'top'|'bottom'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right';
	fluid?: boolean;
}
export function position({attached, fluid}: Position) {
	return [argued({attached}), {fluid}];
}