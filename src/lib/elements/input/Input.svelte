<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { oneOf, semantic, uistr, type Forward } from "$svemantic/root";
    import { loading, type Loading } from '$svemantic/parts/Loading';
    import Icon, { type IconSpec } from '../Icon.svelte';
    import { getForm, getField } from '$svemantic/modules/form';
    import InputBase, { type InputType } from './InputBase.svelte';
	
	interface $$Props extends Forward, Size, Color, Loading {
		fluid?: boolean;
		value?: any;
		type?: InputType;
		placeholder?: string|true;
		name?: string;
		disabled?: boolean;
		transparent?: boolean;
		'left-icon'?: IconSpec;
		'right-icon'?: IconSpec;
		autofocus?: boolean;
		el?: string;
		tabular?: boolean;
	}
	const
		form = getForm(),
		field = getField();
	let directName: string|undefined = undefined,
		name: string|undefined;
	export { directName as name };
	$: name = directName === undefined ? $field?.name : directName;

	export let
		type: InputType = 'text',
		value: any = '',
		autofocus: boolean = false,
		placeholder: string|true = true,
		tabular: boolean = !!form && form.tabular,
		el: string = /*form?.tabular ? 'td' :*/ 'div',
		// Default in table: <td ... "fluid transparent"
		transparent: boolean = tabular,
		fluid: boolean = tabular;
	
	let cs: string, icon: IconSpec, rsltPlaceholder: string;
	$: rsltPlaceholder = placeholder===true?$field?.text:placeholder;
	$: {
		const {disabled, 'left-icon': leftIcon, 'right-icon': rightIcon} = $$props;
		icon = leftIcon || rightIcon;
		cs = uistr('input', $$props, [
			{disabled, transparent, fluid, file: type === 'file', field: tabular},
			oneOf({'right labeled': $$slots.postfix, 'labeled': $$slots.prefix}),
			oneOf({'action': $$slots['right-action'], 'left action': $$slots['left-action']}),,
			oneOf({'icon': !!rightIcon, 'left icon': !!leftIcon}),
			oneOf({'corner': $$slots['right-corner'], 'left corner': $$slots['left-corner']}),
		], size, color, loading);
	}
</script>
<svelte:element this={el} class={cs} use:semantic={$$props}>
	<slot name="prefix" />
	{#if $$slots['left-corner']}
		<div class="ui left corner label"><slot name="left-corner" /></div>
	{/if}
	<slot name="left-action" />
	<slot placeholder={rsltPlaceholder}>
		<InputBase {type} placeholder={rsltPlaceholder} {autofocus} bind:value {name} />
	</slot>
	{#if icon}<Icon {icon} />{/if}
	<slot name="right-action" />
	{#if $$slots['right-corner']}
		<div class="ui corner label"><slot name="right-corner" /></div>
	{/if}
	<slot name="postfix" />
</svelte:element>