<script lang="ts">
	import { buttonProp, type ButtonProp } from './ButtonProp';
    import { oneOf, semantic, uistr, type Forward } from "$svemantic/root";
    import { loading, type Loading } from '$svemantic/parts/Loading';
    import Icon, { type IconSpec } from '../Icon.svelte';
    import Label from '../text/Label.svelte';
    import { getForm } from '$svemantic/modules/form/Form.svelte';
    import { createEventDispatcher } from 'svelte';

	interface $$Props extends Forward, ButtonProp, Loading {
		active?: boolean;
		circular?: boolean;
		href?: string;
		approve?: boolean;
		cancel?: boolean;
		submit?: boolean;
		reset?: boolean;
		rightLabeled?: boolean;
		label?: string;
		icon?: IconSpec;
		text?: string;
		for?: string;
		el?: string;
		tabindex?: number;
	}
	
	let name: string|undefined = undefined;
	export {name as for}
	export let href: string = '',
		rightLabeled: boolean = false,
		submit: boolean = false,
		reset: boolean = false,
		text: string = '',
		icon: IconSpec = '',
		label: string = '',
		el: string = href?'a':name?'label':'button',
		tabindex: number|undefined = el === 'a' ? 0 : undefined;
	let labeled: string|false = '', type: 'submit'|'reset'|'button'|undefined;
	$: type = (el === 'button' || undefined) &&
		(<'submit'|'reset'|undefined>oneOf({submit, reset})||'button');
	$: labeled = !!($$slots.label || label) && (rightLabeled ? 'right labeled' : 'left labeled');
	
	const form = getForm(), dispatch = createEventDispatcher();
		
	function click() {
		if(form) {
			if(submit) form.validate();
			if(reset) form.reset();
		}
		dispatch('click');
	}
	let cs: string;
	$: {
		let {active, circular, approve, cancel} = $$props;
		cs = uistr('button', $$props, [{active, circular, approve, cancel, icon: !!icon && !text && !$$slots.default && !labeled}, labeled], buttonProp, loading);
	}
	// TODO animated
	// TODO labeled icon
</script>
{#if labeled}
	<div class={cs} use:semantic={$$props}>
		{#if !rightLabeled}<slot name="label"><Label basic pointing="right">{label}</Label></slot>{/if}
		{#if $$slots.default}
			<svelte:self {text} {icon}><slot /></svelte:self>
		{:else}
			<svelte:self {text} {icon} />
		{/if}
		{#if rightLabeled}<slot name="label"><Label basic pointing="left">{label}</Label></slot>{/if}
	</div>
{:else if el === 'button'}
	<button {tabindex} {type} class={cs} use:semantic={$$props} on:click={click}>
		{#if icon}<Icon {icon} />{/if}
		<slot>{text}</slot>
	</button>
{:else if el === 'a'}
	<a {tabindex} {href} class={cs} use:semantic={$$props} on:click={click}>
		{#if icon}<Icon {icon} />{/if}
		<slot>{text}</slot>
	</a>
{:else}
	<svelte:element this={el} {tabindex} class={cs} use:semantic={$$props} on:click={click}>
		{#if icon}<Icon {icon} />{/if}
		<slot>{text}</slot>
	</svelte:element>
{/if}