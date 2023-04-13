<script lang="ts" context="module">
	export { getForm, type FormContext } from "./FormModule";
</script>
<script lang="ts">
	import { color, type Color } from "$svemantic/parts/Color";
    import { uistr, type Forward, semantic } from "$svemantic/root";
    import { writable } from "svelte/store";
    import FormModule, { type FormSpecifications } from "./FormModule";

	type T = $$Generic;

	export let tabular: boolean = false, el: string = tabular ? 'tr' : 'div', model: Partial<T> = {};
	const modelStore = writable<Partial<T>>();
	$: modelStore.set(model);
	interface $$Props extends Forward, FormSpecifications<T>, Color {
		el?: string;
	}
	const {form, dirty} = FormModule<T>($$props, modelStore);
	let cs: string;
	$: cs = uistr(tabular ? '' : 'form', $$props, false, color);
</script>
<svelte:element this={el} use:form class={cs} use:semantic={$$props}>
	<slot dirty={$dirty} />
</svelte:element>