<script lang="ts">
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { uistr, type Forward } from "$lib/classes";

	interface $$Props extends Forward, Size, Color {}
	let cs: string;
	$: cs = uistr('text', $$props, false, size, color);
	
</script>
<span class={cs}><slot /></span>