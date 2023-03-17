<script lang="ts">
    import DropDown from "./Dropdown.svelte";
	import { createEventDispatcher, type ComponentProps } from 'svelte';
    import { frwstr } from "$lib/classes";

	const dispatch = createEventDispatcher();
	interface $$Props extends ComponentProps<DropDown> {
		value?: string;
		values: any;	// {#if}<slot : only w/ JS values
	}
	export let value: string = '', placeholder: string|false = '', values: any[],
		module: SemanticUI.Dropdown = <SemanticUI.Dropdown>Object.assign(()=> {}, {settings: {}});
	$: module('set selected', value);
	let config = Object.assign({placeholder, values}, $$restProps);
	function change({detail: {value: newV}}: any) {
		dispatch('change', newV)
		value = newV;
	}
	let cs: string;
	$: cs = frwstr($$props, ['selection']);
	function retrieveText(value: string) {
		return values.find(v=> v.value === value)?.name;
	}
	// TODO: multiselect -> set value
	// TODO {#if}<slot https://github.com/sveltejs/svelte/pull/8304
</script>
<DropDown class={cs} {...config} on:change={change} bind:module>
	<svelte:fragment slot="text">
		{#if value}
			<div class="text">{retrieveText(value)}</div>
		{:else}
			<div class="default text">{placeholder}</div>
		{/if}
	</svelte:fragment>
</DropDown>