<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { oneOf, semantic, uistr, type Forward } from "$svemantic/root";
    import { loading, type Loading } from '$svemantic/parts/Loading';
    import Module from '$svemantic/modules/Module';
    import { getForm, getField, type RulesSpec } from '$svemantic/modules/form';
    import { onDestroy } from 'svelte';

	type Type = 'text'|'email'|'number'|'range'|'password'|'search'|'tel'|'url'|'time'|'date'|'month'|'week'|'datetime-local'|'color'|'file'|'area';
	// not done here: checkbox radio hidden reset button submit 
	//? image
	
	interface $$Props extends Forward, Size, Color, Loading {
		value?: boolean;
		name?: string;
		el?: string;
		label?: string|true;
		disabled?: boolean;
		toggle?: boolean;
		slider?: boolean;
	}
	const form = getForm(),
		tabular = !!form && form.tabular,
		field = getField();
	let directName: string|undefined = undefined,
		name: string|undefined;
	export { directName as name };
	$: name = directName === undefined ? field?.name : directName;
	export let value: boolean|undefined = false,
		disabled: boolean = false,
		el: string = 'div',
		label: string|boolean = false;
	let cs: string,
		rsltLabel: string;
	if(field && label === true) onDestroy(field.text.subscribe((t: string)=> rsltLabel = t));
	$: if(typeof label === 'string') rsltLabel = label;
	
	$: $forward(value === true ? 'set checked' : value === false ? 'set unchecked' : 'set indeterminate');
	$: $forward(disabled ? 'set disabled' : 'set enabled');

	const {module, forward} = Module('checkbox', {
		onChecked() { value = true; },
		onUnchecked() { value = false; },
		onIndeterminate() { value = undefined; }
	});
	$: {
		let {disabled, toggle, slider, right} = $$props;
		cs = uistr('checkbox', $$props, [
			{disabled, tabular, field: tabular},
			oneOf({toggle, slider}),
			right && 'right aligned'
		], size, color, loading);
	}
</script>
<svelte:element this={el} use:module class={cs} use:semantic={$$props}>
	<slot name="label">
		{#if label}
			<label for={name}>{rsltLabel}</label>
		{/if}
	</slot>
	<input type="checkbox" {name} />
</svelte:element>
<style lang="scss" global>
	table tr {
		> th, > td {
			.ui.checkbox {
				display: table-cell;
				padding: 0;
			}
		}
	}
</style>