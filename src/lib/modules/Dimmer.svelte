<script lang="ts">
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { uistr, type Forward } from "$lib/classes";

	interface $$Props extends Size, Color, Forward {
		active?: boolean;
		inverted?: boolean;
	}
	let cs: string;
	$: {
		let {active, inverted} = $$props;
		cs = uistr('dimmer', $$props, [
			{active, inverted}
		], size, color);
	}
</script>
<div class={cs}><slot /></div>