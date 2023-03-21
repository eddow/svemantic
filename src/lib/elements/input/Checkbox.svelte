<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { oneOf, semantic, uistr, type Forward } from "$svemantic/root";
    import { loading, type Loading } from '$svemantic/parts/Loading';
    import { getField } from '$svemantic/modules/form/Field.svelte';
    import Module from '$svemantic/modules/Module';

	type Type = 'text'|'email'|'number'|'range'|'password'|'search'|'tel'|'url'|'time'|'date'|'month'|'week'|'datetime-local'|'color'|'file'|'area';
	// not done here: checkbox radio hidden reset button submit 
	//? image
	
	interface $$Props extends Forward, Size, Color, Loading {
		value?: boolean;
		name?: string;
		label?: string;
		disabled?: boolean;
		toggle?: boolean;
		slider?: boolean;
	}
	export let value: boolean|undefined = false, disabled: boolean = false;
	let cs: string, name: string, specName: string = '', label: string, specLabel: string = '',
		node: HTMLElement|undefined = undefined;
	export {specName as name, specLabel as label};
	$: module(value === true ? 'set checked' : value === false ? 'set unchecked' : 'set indeterminate');
	$: module(disabled ? 'set disabled' : 'set enabled');
	const field = getField(), module = Module('checkbox', {
		onChecked() { value = true; },
		onUnchecked() { value = false; },
		onIndeterminate() { value = undefined; }
	});
	$: name = specName || (field && $field.name);
	$: label = specLabel || (field && $field.text);
	$: {
		let {disabled, toggle, slider, right} = $$props;
		cs = uistr('checkbox', $$props, [
			{disabled},
			oneOf({toggle, slider}),
			right && 'right aligned'
		], size, color, loading);
	}
</script>
<div use:module bind:this={node} class={cs} use:semantic={$$props}>
	<slot name="label">
		{#if label}
			<label for={name}>{label}</label>
		{/if}
	</slot>
	<input type="checkbox" {name} />
</div>