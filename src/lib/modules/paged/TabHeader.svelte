<script lang="ts">
	import { combine } from "$svemantic/root";
    import { getTabs } from "./Tabs.svelte";
	
	export let spec: SveMantic.TabSpecification, key: string;
	const context = getTabs();

	let cs: string;
	$: cs = combine({inverted: spec.inverted, active: key === $context}, 'item');

	function click() {
		$context = key;
	}
</script>
<a class={cs} on:click={click}>
	<slot name="header" />
</a>