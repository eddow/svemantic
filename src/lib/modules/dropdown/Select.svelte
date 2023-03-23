<script lang="ts">
    import Dropdown, { type DropdownEvent, type DropdownOption } from "./Dropdown.svelte";
	import { createEventDispatcher, onMount, type ComponentProps } from 'svelte';
	import FormInput, { type RulesSpec } from "../form/FormInput.svelte";
	import { getForm } from "../form/FormModule";
    import { field } from "$svemantic/i18n";
	import { clastr } from "$svemantic/root";

	type T = $$Generic<string | string[]>;

	function change({detail: {value: newV}}: any) {
		dispatch('change', newV)
		if(!multiple || delimiter) value = newV;
	}
	function add({detail: {value: addV}}: DropdownEvent) {
		if(multiple && !delimiter && !(<string[]>value).includes(addV))
			value = <T>[...value, addV];
	}
	function remove({detail: {value: remV}}: DropdownEvent) {
		if(multiple && !delimiter) value = <T>(<string[]>value).filter(v=> v!= remV);
	}
	const
		dispatch = createEventDispatcher(),
		form = getForm(),
		tabular = !!form && form.tabular;
	interface $$Props extends ComponentProps<Dropdown> {
		value?: T;
		options: DropdownOption[];
	}
	export let
		delimiter: string|false = false,
		name: string = '',
		placeholder: string|boolean = '',
		options: DropdownOption[],
		multiple: boolean = false,
		value: T = <T>((multiple && !delimiter) ? [] : ''),
		// Default in table: <td ... "transparent"
		el: string = 'div',
		transparent: boolean = tabular,
		// FormInput forward
		required: boolean = false,
		validate: RulesSpec|undefined = undefined;
		
	let	module: SemanticUI.Dropdown;
	const config = {placeholder, options, name, transparent, multiple, el, delimiter: delimiter||'|', ...$$restProps};
	if(name) field(name, placeholder, v=> {
		config.placeholder = placeholder = v;
		module && (<any>module)('set placeholder text', v);	// new in fomantic?
	});
		// module.set.placeholderText();
	$: if(multiple)
		module && module('set exactly', typeof value === 'string' ? value.split(delimiter||'|') : value);
	else module && module('set selected', value);
	// TODO: multiselect -> set value
	// TODO {#if}<slot https://github.com/sveltejs/svelte/pull/8304
	function castr(x: any) { return <string>x || ''; }	// No typescript in svelte templates *but* typescript errors!
	let cs: string;
	$: cs = clastr('selection', $$props);
</script>
<Dropdown {...config} class={cs} on:change={change} on:add={add} on:remove={remove} bind:module>
	<FormInput {required} {validate} {name} text={castr(placeholder)} slot="text">
		<div class="text"></div>
	</FormInput>
</Dropdown>
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