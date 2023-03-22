<script lang="ts">
    import DropDown, { type DropdownOption } from "./Dropdown.svelte";
	import { createEventDispatcher, type ComponentProps } from 'svelte';
	import FormInput, { type RulesSpec } from "../form/FormInput.svelte";
	import { getForm } from "../form/FormModule";

	function change({detail: {value: newV}}: any) {
		dispatch('change', newV)
		value = newV;
	}
	function retrieveText(value: string) {
		let item = options.find(v=> v.value === value);
		return item?.display || item?.text || value;
	}
	const
		dispatch = createEventDispatcher(),
		form = getForm(),
		tabular = !!form && form.tabular;
	interface $$Props extends ComponentProps<DropDown> {
		value?: string;
		options: DropdownOption[];	// {#if}<slot : only w/ JS values
	}
	export let
		name: string = '',
		value: string = '',
		placeholder: string|boolean = '',
		options: DropdownOption[],
		// Default in table: <td ... "transparent"
		el: string = tabular?'td':'div',
		transparent: boolean = tabular,
		// FormInput forward
		required: boolean = false,
		validate: RulesSpec|undefined = undefined;
		
	let	module: SemanticUI.Dropdown = <SemanticUI.Dropdown>Object.assign(()=> {}, {settings: {}}),
		config = {placeholder, options, name, transparent, el, ...$$restProps};
	$: module('set selected', value);
	// TODO: multiselect -> set value
	// TODO {#if}<slot https://github.com/sveltejs/svelte/pull/8304
</script>
<DropDown {...config} class="selection" on:change={change} bind:module>
	<FormInput {required} {validate} {name} slot="text">
		{#if value}
			<div class="text">{retrieveText(value)}</div>
		{:else}
			<div class="default text">{placeholder}</div>
		{/if}
	</FormInput>
</DropDown>
<style lang="scss" global>
	table tr {
		> th, > td {
			&.ui.selection.dropdown {
				display: table-cell;
				background: transparent;
			}
		}
	}
</style>