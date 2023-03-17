
<script lang="ts">
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { semantic, uistr, type Forward } from "$lib/root";
    import Dimmer from '$lib/modules/Dimmer.svelte';
    import { loading, type Loading } from '$lib/parts/Loading';

	interface $$Props extends Forward, Size, Color, Loading {
		disabled?: boolean;
		indeterminate?: boolean;
		loading?: boolean;
	}
	let active: boolean = true;
	export {active as loading};
	export let inverted: boolean = false;
	let cs: string;
	$: {
		let {disabled, indeterminate} = $$props;
		cs = uistr('loader', $$props, [
			{disabled, indeterminate, text: $$slots.default}
		], size, color, loading);
	}
</script>
<Dimmer {active} {inverted}>
	<div class={cs} use:semantic={$$props}>
		<slot></slot>
	</div>
</Dimmer>