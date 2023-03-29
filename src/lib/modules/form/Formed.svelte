<script lang="ts" context="module">
	export { getForm, type FormContext } from "./FormModule";
</script>
<script lang="ts">
    import FormModule, { type FormSpecifications } from "./FormModule";

	type T = $$Generic;

	export let
		model: Partial<T> = {};
	interface $$Props extends FormSpecifications<T> {}
	export const form = FormModule<T>($$props);
	$: form('set values', model);	// TODO Update module and context too?
	// TODO bind an object as a value
</script>
<slot {form} />
