<script lang="ts">
	import { childrenNumber, type ChildrenNumber } from '$svemantic/parts/Number';
	import { clastr, semantic, type Forward } from "$svemantic/root";
    import { color, type Color } from '$svemantic/parts/Color';

	interface $$Props extends Forward, Color, ChildrenNumber {
		floated?: 'left'|'right';
		aligned?: 'left'|'right';
	}
	let cs: string;
	$: {
		let {floated, aligned} = $$props;
		cs = clastr('row', $$props, {floated, aligned}, color, childrenNumber('wide'));
	}
</script>
<div class={cs} use:semantic={$$props}><slot /></div>