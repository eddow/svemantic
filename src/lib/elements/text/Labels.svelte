<script lang="ts">
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { semantic, uistr, type Forward } from "$lib/root";

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