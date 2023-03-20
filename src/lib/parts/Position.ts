import { combine } from "$svemantic/root";

type VertSpec = 'top'|'bottom';
type HorzSpec = 'left'|'right';

export interface Position {
	attached?: VertSpec|HorzSpec|`${VertSpec} ${HorzSpec}`;
	fixed?: VertSpec;
	fluid?: boolean;
}
export function position({attached, fixed, fluid}: Position) {
	console.assert(!fixed || !attached, 'Cannot be fixed and attached at the same time');
	return combine({attached, fixed, fluid});
}