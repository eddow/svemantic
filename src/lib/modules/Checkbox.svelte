<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { oneOf, semantic, uistr, type Forward } from "$svemantic/root";
    import { loading, type Loading } from '$svemantic/parts/Loading';
    import Module from '$svemantic/modules/Module';
    import { getForm } from '$svemantic/modules/form/FormModule';
    import FormInput, { type RulesSpec } from './form/FormInput.svelte';
    import { field } from '$svemantic/i18n';

	type Type = 'text'|'email'|'number'|'range'|'password'|'search'|'tel'|'url'|'time'|'date'|'month'|'week'|'datetime-local'|'color'|'file'|'area';
	// not done here: checkbox radio hidden reset button submit 
	//? image
	
	interface $$Props extends Forward, Size, Color, Loading {
		value?: boolean;
		name?: string;
		label?: string|true;
		disabled?: boolean;
		toggle?: boolean;
		slider?: boolean;
	}
	const form = getForm(), tabular = !!form && form.tabular;
	export let name: string|undefined = undefined, value: boolean|undefined = false, disabled: boolean = false,
		label: string|true = '';
	export let required: boolean = false, validate: RulesSpec|undefined = undefined;
	let cs: string;
	if(name) field(name, label, v=> label = v);
	$: module(value === true ? 'set checked' : value === false ? 'set unchecked' : 'set indeterminate');
	$: module(disabled ? 'set disabled' : 'set enabled');

	const module = Module('checkbox', {
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
<div use:module class={cs} use:semantic={$$props}>
	<slot name="label">
		{#if label}
			<label for={name}>{label}</label>
		{/if}
	</slot>
	<FormInput {required} {validate} {name} text={label}>
		<input type="checkbox" {name} />
	</FormInput>
</div>
<style lang="scss" global>
	table  tr {
		> th.ui.checkbox, > td.ui.checkbox {
			display: table-cell;
			padding: 0;
		}
	}
</style>