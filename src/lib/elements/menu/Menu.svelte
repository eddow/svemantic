<script lang="ts">
    import Items from './Items.svelte';
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { argued, semantic, uistr, type Forward } from "$lib/root";
	import { position, type Position } from "$lib/parts/Position";
    import { childrenNumber, type ChildrenNumber } from '$lib/parts/Number';

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
		cs = uistr('menu', $$props, [argued({icon}), {vertical, tabular, compact, right}], size, color, childrenNumber, position);
	}
</script>
<div class={cs} use:semantic={$$props}>
	<slot />
</div>