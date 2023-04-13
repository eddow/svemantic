<script lang="ts" context="module">
	export { getForm, type FormContext } from "./FormModule";
</script>
<script lang="ts">
    import { writable } from "svelte/store";

    import FormModule, { type FormSpecifications } from "./FormModule";

	type T = $$Generic;

	export let
		model: Partial<T> = {};
	const modelStore = writable<Partial<T>>();
	$: modelStore.set(model);
	interface $$Props extends FormSpecifications<T> {}
	export const {form, dirty} = FormModule<T>($$props, modelStore);
	// TODO bind an object as a value
</script>
<slot {form} dirty={$dirty} />
