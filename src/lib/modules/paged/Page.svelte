<script lang="ts">
	export let spec: Paged.Specification, key: string = '';
</script>
<svelte:component this={spec.part} {spec} {key}>
	<slot name="header" slot="header" />
	<slot />
</svelte:component>