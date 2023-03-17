<script lang="ts">
	import { buttonProp, type ButtonProp } from './ButtonProp';
    import { semantic, uistr, type Forward } from "$lib/root";
    import { loading, type Loading } from '$lib/parts/Loading';
    import Icon, { type IconSpec } from '../Icon.svelte';
    import Label from '../text/Label.svelte';

	type Element = 'a'|'button'|'label';
	type ButtonType = 'button'|'submit'|'reset'|undefined;
	interface $$Props extends Forward, ButtonProp, Loading {
		active?: boolean;
		circular?: boolean;
		type?: 'button'|'submit'|'reset';
		href?: string;
		approve?: boolean;
		cancel?: boolean;
		rightLabeled?: boolean;
		label?: string;
		icon?: IconSpec;
		text?: string;
		for?: string;
		element?: Element;
		tabindex?: number;
	}
	
	let name: string|undefined = undefined;
	export {name as for}
	export let type: ButtonType = undefined,
		href: string = '',
		rightLabeled: boolean = false,
		text: string = '',
		icon: IconSpec = '',
		label: string = '',
		element: Element = href?'a':name?'label':'button',
		tabindex: number|undefined = element === 'a' ? 0 : undefined;
	if(element === 'button' && type === undefined) type = 'button';	//avoid auto-submit
	let labeled: string|false = '';
	$: labeled = !!($$slots.label || label) && (rightLabeled ? 'right labeled' : 'left labeled');

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
{:else}
	<svelte:element this={element} {tabindex} {type} {href} class={cs} use:semantic={$$props}>
		{#if icon}<Icon {icon} />{/if}
		<slot>{text}</slot>
	</svelte:element>
{/if}