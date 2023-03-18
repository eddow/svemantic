<script lang="ts">
	import { combine } from "$lib/root";
    import Module from "$lib/modules/Module.svelte";

	export let spec: Paged.TabSpecification, key: string;
	let cs: string, node: HTMLElement;
	$: cs = combine({inverted: spec.inverted}, 'item');
</script>
<Module {node} access="tab">
	<a class={cs} data-tab={key} bind:this={node}>
		<slot name="header" />
	</a>
</Module>