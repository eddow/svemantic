<script lang="ts" context="module">
	export { getForm, type FormContext } from "./FormModule";
</script>
<script lang="ts">
	import { color, type Color } from "$svemantic/parts/Color";
    import { uistr, type Forward, semantic } from "$svemantic/root";
    import FormModule, { type FormSpecifications } from "./FormModule";

	type T = $$Generic;

	export let tabular: boolean = false, el: string = tabular ? 'tr' : 'div', model: Partial<T> = {};
	interface $$Props extends Forward, FormSpecifications<T>, Color {
		el?: string;
	}
	const module = FormModule<T>($$props);
	$: module('set values', model);	// TODO Update module and context too?
	let cs: string;
	$: cs = uistr(tabular ? '' : 'form', $$props, false, color);
	// TODO bind an object as a value
</script>
<svelte:element this={el} use:module class={cs} use:semantic={$$props}>
	<slot />
</svelte:element>