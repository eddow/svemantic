<script lang="ts">
	import { combine } from "$svemantic/root";
    import { getPageContainer } from "./PageContainer.svelte";
    import { getTabs, type TabSpecification } from "./Tabs.svelte";

	export let key: string;
	let spec = getPageContainer<TabSpecification>();
	const context = getTabs();

	let cs: string;
	$: cs = combine('ui', spec.side, 'attached', {inverted: spec.inverted, active: key === $context}, 'tab segment');
</script>
<div class={cs}><slot /></div>