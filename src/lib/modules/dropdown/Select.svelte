<script lang="ts">
    import Dropdown, { type DropdownEvent, type DropdownOption } from "./Dropdown.svelte";
	import { createEventDispatcher, onDestroy, onMount, type ComponentProps } from 'svelte';
	import { getForm, getField } from "../form";
	import { clastr } from "$svemantic/root";
    import type { Readable } from "svelte/store";

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
	$: name = directName === undefined ? field?.name : directName;
	interface $$Props extends ComponentProps<Dropdown> {
		value?: T;
		options: DropdownOption[];
	}
	export let
		delimiter: string|false = false,
		placeholder: string|boolean = '',
		options: DropdownOption[],
		multiple: boolean = false,
		value: T = <T>((multiple) ? [] : ''),
		// Default in table: <td ... "transparent"
		el: string = 'div',
		transparent: boolean = tabular,
		fluid: boolean = tabular;
	if(field?.default) onDestroy(field.default.subscribe((v: T)=> value = v));
	let	forward: Readable<SemanticUI.Dropdown>,
		rsltPlaceholder: string;
	const config = {placeholder, options, name, transparent, multiple, el, delimiter: delimiter||'|', ...$$restProps};
	if(field && placeholder === true) onDestroy(field.text.subscribe((t: string)=> rsltPlaceholder = t));
	$: if(typeof placeholder === 'string') rsltPlaceholder = placeholder;
	$: (<any>$forward)?.('set placeholder text', rsltPlaceholder);	// cast for old @types/semantic-ui version
	$: if(multiple)
		$forward?.('set exactly', typeof value === 'string' ? value.split(delimiter||'|') : value);
	else $forward?.('set selected', value);
	// TODO {#if}<slot https://github.com/sveltejs/svelte/pull/8304
	let cs: string;
	$: cs = clastr('selection', $$props);
</script>
<Dropdown {...config} {name} placeholder={rsltPlaceholder}
	class={cs} {fluid} {transparent}
	on:change={change} on:add={add} on:remove={remove} bind:forward
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