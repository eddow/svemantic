<script lang="ts">
	import { color, type Color } from '$lib/parts/Color';
    import { uistr, type Forward } from "$lib/classes";

	interface $$Props extends Color, Forward {
		active?: boolean;
		inverted?: boolean;
	}
	let cs: string;
	$: {
		let {active, inverted} = $$props;
		cs = uistr('dimmer', $$props, [
			{active, inverted}
		], color);
	}
</script>
<div class={cs}><slot /></div>