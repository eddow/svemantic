<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";
    import { loading, type Loading } from '$svemantic/parts/Loading';
    import Icon, { type IconSpec } from '../Icon.svelte';
    import { getField } from '$svemantic/modules/form/Field.svelte';

	type Type = 'text'|'email'|'number'|'range'|'password'|'search'|'tel'|'url'|'time'|'date'|'month'|'week'|'datetime-local'|'color'|'file'|'area';
	// not done here: checkbox radio hidden reset button submit 
	//? image
	
	interface $$Props extends Forward, Size, Color, Loading {
		value?: string;
		type?: Type;
		placeholder?: string;
		name?: string;
		disabled?: boolean;
		transparent?: boolean;
		icon?: IconSpec;
		leftIcon?: boolean;
		leftAction?: boolean;
		leftCorner?: boolean;
		label?: string;
	}
	export let icon: IconSpec = '', type: Type = 'text', placeholder: string = '', value: string = '',
		leftCorner: boolean = false, leftAction: boolean = false, leftIcon: boolean = false, label: string = '';
	let cs: string, name: string, specName: string = '';
	export {specName as name};
	const field = getField();
	$: name = specName || (field && $field.name);
	$: placeholder = (field && $field.text) || placeholder;
	$: {
		let {disabled, transparent} = $$props;
		cs = uistr('input', $$props, [
			{disabled, transparent, file: type === 'file'},
			$$slots['right-label'] ? 'right labeled' : label || $$slots['left-label'] ? 'labeled' : false,
			$$slots.action && (leftAction ? 'left action' : 'action'),
			!!icon && (leftIcon ? 'left icon' : 'icon'),
			$$slots['corner'] && (leftCorner ? 'left corner labeled' : 'corner labeled')
		], size, color, loading);
	}
	const handleInput = (e: any) => {
		value = (<any>e.target!).value;
	};
</script>
<div class={cs} use:semantic={$$props}>
	<slot name="left-label">
		{#if label}
			<label for={name} class="ui label">{label}</label>
		{/if}
	</slot>
	{#if $$slots.corner && leftCorner}
		<div class="ui left corner label"><slot name="corner" /></div>
	{/if}
	{#if leftAction}<slot name="action" />{/if}
	<slot>
		{#if type === 'area'}
			<textarea {value} {name} {placeholder} on:input={handleInput}></textarea>
		{:else}
			<input {type} {value} {name} {placeholder} on:input={handleInput} />
		{/if}
	</slot>
	{#if !leftAction}<slot name="action" />{/if}
	{#if icon}<Icon {icon} />{/if}
	{#if $$slots.corner && !leftCorner}
		<div class="ui corner label"><slot name="corner" /></div>
	{/if}
	<slot name="right-label" />
</div>