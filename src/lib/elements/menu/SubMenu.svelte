<script lang="ts">
    import DropDown from "$svemantic/modules/dropdown/Dropdown.svelte";
	import type { ComponentProps } from 'svelte';
    import { clastr, type Forward } from "$svemantic/root";

	interface $$Props extends Forward, ComponentProps<DropDown> {
	}
	let cs: string;
	$: cs = clastr('item', $$props);
</script>
<DropDown {...$$restProps} class={cs}>
	<slot name="text" slot="text" />
	<slot slot="menu" />
</DropDown>