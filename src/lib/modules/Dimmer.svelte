<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
    import { semantic, uistr, type Forward } from "$svemantic/root";

	interface $$Props extends Forward, Color {
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
<div class={cs} use:semantic={$$props}><slot /></div>