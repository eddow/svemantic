<script lang="ts" context="module">
	export { getForm, type FormContext } from "./FormModule";
</script>
<script lang="ts">
    import { uistr, type Forward, semantic } from "$svemantic/root";
    import FormModule, { type FormSpecifications } from "./FormModule";

	type T = $$Generic;

	export let tabular: boolean = false, element: string = tabular ? 'tr' : 'div', model: Partial<T> = {};
	interface $$Props extends Forward, FormSpecifications<T> {}
	const module = FormModule<T>($$props);
	$: module('set values', model);
	let cs: string;
	$: cs = uistr('form', $$props);
	// TODO bind an object as a value
</script>
<svelte:element use:module this={element} class={cs} use:semantic={$$props}>
	<slot />
</svelte:element>
