<script lang="ts" context="module">
	export interface PageSpecification {
		part: ConstructorOfATypedSvelteComponent;
		KeyGen?(): string;
	}
</script>
<script lang="ts">
	import { getPageContainer } from "./PageContainer.svelte"
	export let key: string|null = null,
		active: boolean|undefined = undefined;
	let spec = getPageContainer();
	if(spec && !key) key = spec.KeyGen!();	//unique object
</script>
{#if spec}
	<svelte:component this={spec.part} {active} {key}>
		<slot name="header" slot="header" />
		<slot />
	</svelte:component>
{:else}
	<div class="ui message error">A page can only appear in a paged component</div>
{/if}