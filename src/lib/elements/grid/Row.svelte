<script lang="ts">
	import { containerProp, type ContainerProp } from './ContainerProp';
    import { clastr, semantic, type Forward } from "$svemantic/root";
    import { color, type Color } from '$svemantic/parts/Color';

	interface $$Props extends Forward, ContainerProp, Color {
		stretched?: boolean;
	}
	let cs: string;
	$: {
		let {stretched} = $$props;
		cs = clastr('row', $$props, {stretched}, containerProp, color);
	}
</script>
<div class={cs} use:semantic={$$props}><slot /></div>