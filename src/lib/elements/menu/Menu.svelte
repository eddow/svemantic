<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
	import { semantic, uistr, type Forward } from "$svemantic/root";
	import { position, type Position } from "$svemantic/parts/Position";
	import { childrenNumber, type ChildrenNumber } from '$svemantic/parts/Number';

	interface $$Props extends Forward, Size, Color, ChildrenNumber, Position {
		icon?: boolean | 'labeled';
		vertical?: boolean;
		tabular?: boolean;
		compact?: boolean;
		right?: boolean;
	}
	// TODO labeled icon
	let cs: string;
	$: {
		let {icon, vertical, tabular, compact, right} = $$props;
		cs = uistr('menu', $$props, {icon, vertical, tabular, compact, right}, size, color, childrenNumber('item'), position);
	}
</script>
<div class={cs} use:semantic={$$props}>
	<slot />
</div>