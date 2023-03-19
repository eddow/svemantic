<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";

	interface $$Props extends Forward, Size, Color {}
	let cs: string;
	$: cs = uistr('text', $$props, false, size, color);
</script>
<span class={cs} use:semantic={$$props}><slot /></span>