<script lang="ts" context="module">
	export { getForm, type FormContext } from "./FormModule.svelte";
</script>
<script lang="ts">
    import { uistr, type Forward, semantic } from "$svemantic/root";
    import type { Readable } from "svelte/store";
    import type { FomanticField } from "./Field.svelte";
    import FormModule, { type FormSpecifications } from "./FormModule.svelte";

	type T = $$Generic;

	let node: HTMLElement;
	export let tabular: boolean = false, element: string = tabular ? 'tr' : 'div';
	interface $$Props extends Forward, FormSpecifications<T> {}

	let cs: string;
	$: cs = uistr('form', $$props);
	// TODO bind an object as a value
</script>
<svelte:element this={element} class={cs} use:semantic={$$props} bind:this={node}>
	<FormModule {node} on:submit on:failure {...$$props}>
		<slot />
	</FormModule>
</svelte:element>
