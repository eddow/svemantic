<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { oneOf, semantic, uistr, type Forward } from "$svemantic/root";
    import { loading, type Loading } from '$svemantic/parts/Loading';
    import Icon, { type IconSpec } from '../Icon.svelte';
    import { getForm } from '$svemantic/modules/form/FormModule';
    import { createEventDispatcher, onDestroy, type ComponentProps } from 'svelte';
    import { field } from '$svemantic/i18n';
    import FormInput, { type RulesSpec } from '$svemantic/modules/form/FormInput.svelte';

	type Type = 'text'|'email'|'number'|'range'|'password'|'search'|'tel'|'url'|'time'|'date'|'month'|'week'|'datetime-local'|'color'|'file'|'area';
	// not done here: checkbox radio hidden reset button submit 
	//? image
	
// TODO Generics all along? (input, field, -> form[fieldName])

	interface $$Props extends Forward, ComponentProps<FormInput>, Size, Color, Loading {
		fluid?: boolean;
		value?: any;
		type?: Type;
		placeholder?: string|true;
		name?: string;
		disabled?: boolean;
		transparent?: boolean;
		'left-icon'?: IconSpec;
		'right-icon'?: IconSpec;
		autofocus?: boolean;
		el?: string;
		tabular?: boolean
	}
	const
		dispatch = createEventDispatcher(),
		form = getForm();
	export let
		type: Type = 'text',
		value: any = '',	// TODO Initialize to form's default
		autofocus: boolean = false,
		name: string|undefined = undefined,
		placeholder: string|true = '',
		el: string = 'div',
		// Default in table: <td ... "fluid transparent"
		tabular: boolean = !!form && form.tabular,
		transparent: boolean = tabular,
		fluid: boolean = tabular,
		// FormInput forward
		required: boolean = false,
		validate: RulesSpec|undefined = undefined;
	
	let cs: string, icon: IconSpec;
	field(name, placeholder, v=> placeholder = v);
	
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
	function handleInput(e: any) {
		value = (<any>e.target!).value;
		dispatch('input', value);
	};
	
	function castr(x: any) { return <string>x; }	// No typescript in svelte templates *but* typescript errors!
</script>
<svelte:element this={el} class={cs} use:semantic={$$props}>
	<slot name="prefix" />
	{#if $$slots['left-corner']}
		<div class="ui left corner label"><slot name="left-corner" /></div>
	{/if}
	<slot name="left-action" />
	<FormInput {required} {validate} {name} let:errors>
		<slot {errors}>
			{#if type === 'area'}
				<textarea placeholder={castr(placeholder)} {autofocus} {value} {name} on:input={handleInput}></textarea>
			{:else}
				<input placeholder={castr(placeholder)} {autofocus} {type} {value} {name} on:input={handleInput} />
			{/if}
		</slot>
	</FormInput>
	{#if icon}<Icon {icon} />{/if}
	<slot name="right-action" />
	{#if $$slots['right-corner']}
		<div class="ui corner label"><slot name="right-corner" /></div>
	{/if}
	<slot name="postfix" />
</svelte:element>