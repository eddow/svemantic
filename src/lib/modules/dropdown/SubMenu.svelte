<script lang="ts">
	// TODO
    import DropDown from "./Dropdown.svelte";
	import type { ComponentProps } from 'svelte';
    import { clastr } from "$lib/classes";

	interface $$Props extends ComponentProps<DropDown> {}
	let cs: string;
	$: cs = clastr('item', $$props);
</script>
<DropDown class={cs} {...$$restProps}>
	<slot name="menu" slot="menu" />
</DropDown>