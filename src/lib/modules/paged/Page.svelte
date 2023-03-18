<script lang="ts">
	import { getPageContainer } from "./PageContainer.svelte"
	export let spec: SveMantic.PageSpecification, pc = getPageContainer(), key: string|null = null;
	if(!key) key = pc && pc();	//unique object
</script>
<svelte:component this={spec.part} {spec} {key}>
	<slot name="header" slot="header" />
	<slot />
</svelte:component>