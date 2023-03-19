import { argued } from "$svemantic/root";

export interface Position {
	attached?: 'top'|'bottom'|'left'|'right'|'top left'|'top right'|'bottom left'|'bottom right';
	fixed?: 'top'|'bottom';
	fluid?: boolean;
}
export function position({attached, fixed, fluid}: Position) {
	console.assert(!fixed || !attached, 'Cannot be fixed and attached at the same time');
	return [argued({attached, fixed}), {fluid}];
}