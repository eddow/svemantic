<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";

	interface $$Props extends Forward, Size, Color {
		tag?: boolean;
		circular?: boolean;
	}
	let cs: string;
	$: {
		let {tag, circular} = $$props;
		cs = uistr('labels', $$props, {tag, circular}, size, color);
	}
</script>
<div class={cs} use:semantic={$$props}>
	<slot />
</div>