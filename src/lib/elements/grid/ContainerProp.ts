import { childrenNumber, type ChildrenNumber } from '$svemantic/parts/Number';

export type Device = 'computer'|'tablet'|'mobile'|'widescreen'|'large screen'
export interface ContainerProp extends ChildrenNumber {
	relaxed?: boolean;
	celled?: boolean|'internally';
	padded?: boolean;
	compact?: boolean|'very';
	divided?: boolean|'vertically';
	centered?: boolean;
	stackable?: boolean;
	doubling?: boolean;
	equalWidth?: boolean;
	mobileReversed?: boolean;
	only?: Device;
}

export function containerProp({
	relaxed, celled, padded, compact, divided, centered, stackable, equalWidth, mobileReversed, doubling,
	...props}: ContainerProp) {
	return [{
		relaxed, celled, padded, compact, divided, centered, stackable, doubling
	}, equalWidth && 'equal width', mobileReversed && 'mobile reversed', childrenNumber('column')(props)];
}
