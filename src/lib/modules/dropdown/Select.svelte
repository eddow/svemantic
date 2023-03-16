<script lang="ts">
    import DropDown from "./Dropdown.svelte";
	import { createEventDispatcher, type ComponentProps } from 'svelte';
    import { frwstr, type Forward } from "$lib/classes";

	const dispatch = createEventDispatcher();
	interface $$Props extends ComponentProps<DropDown>, Forward {
		value?: string;
	}
	export let value: string = '',
		module: SemanticUI.Dropdown = <SemanticUI.Dropdown>Object.assign(()=> {}, {settings: {}});
	$: module('set selected', value);	// TODO render correct value SSR

	function change({detail: {value: newV}}: any) {
		dispatch('change', newV)
		value = newV;
	}
	let cs: string;
	$: cs = frwstr($$props, ['selection']);
	// TODO: multiselect -> set value
	// TODO https://github.com/sveltejs/svelte/pull/8304
</script>
<DropDown class={cs} {...$$restProps} on:change={change} bind:module />