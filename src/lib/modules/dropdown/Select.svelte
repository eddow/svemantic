<script lang="ts">
    import Dropdown, { type DropdownEvent, type DropdownOption } from "./Dropdown.svelte";
	import { createEventDispatcher, onMount, type ComponentProps } from 'svelte';
	import { getForm, getField } from "../form";
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
		tabular = !!form && form.tabular,
		field = getField();
	let directName: string|undefined = undefined,
		name: string|undefined;
	export { directName as name };
	$: name = directName === undefined ? $field?.name : directName;
	interface $$Props extends ComponentProps<Dropdown> {
		value?: T;
		options: DropdownOption[];
	}
	export let
		delimiter: string|false = false,
		placeholder: string|boolean = '',
		options: DropdownOption[],
		multiple: boolean = false,
		value: T = <T>((multiple && !delimiter) ? [] : ''),
		// Default in table: <td ... "transparent"
		el: string = 'div',
		transparent: boolean = tabular,
		fluid: boolean = tabular;
		
	let	module: SemanticUI.Dropdown;
	const config = {placeholder, options, name, transparent, multiple, el, delimiter: delimiter||'|', ...$$restProps};
	$: if(placeholder === true) {
		config.placeholder = placeholder = $field.text;
		module && (<any>module)('set placeholder text', placeholder);	// untyped: new in fomantic?
	}
		// module.set.placeholderText();
	$: if(multiple)
		module && module('set exactly', typeof value === 'string' ? value.split(delimiter||'|') : value);
	else module && module('set selected', value);
	// TODO {#if}<slot https://github.com/sveltejs/svelte/pull/8304
	let cs: string;
	$: cs = clastr('selection', $$props);
</script>
<Dropdown {...config} {name} placeholder={placeholder===true?$field?.text:placeholder}
	class={cs} {fluid} {transparent}
	on:change={change} on:add={add} on:remove={remove} bind:module
>
	<slot><div class="text"></div></slot>
</Dropdown>
<style lang="scss" global>
	table tr {
		> th, > td {
			.ui.selection.dropdown {
				min-height: 0;
				background: transparent;
			}
		}
	}
</style>