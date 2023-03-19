
<script lang="ts">
	import { combine } from "$svemantic/root";
    import { getPageContainer } from "./PageContainer.svelte";
    import { getTabs, type TabSpecification } from "./Tabs.svelte";
	
	export let key: string;
	let spec = getPageContainer<TabSpecification>();
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