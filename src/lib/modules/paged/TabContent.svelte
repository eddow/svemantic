<script lang="ts">
	import { combine } from "$lib/root";
    import { getTabs } from "./Tabs.svelte";

	export let spec: SveMantic.TabSpecification, key: string;
	const context = getTabs();

	let cs: string;
	$: cs = combine('ui', spec.side, 'attached', {inverted: spec.inverted, active: key === $context}, 'tab segment');
</script>
<div class={cs}><slot /></div>