<script lang="ts">
	import { buttonProp, type ButtonProp } from './ButtonProp';
    import { uistr, type Forward } from "$lib/classes";
    import { loading, type Loading } from '$lib/parts/Loading';

	interface $$Props extends ButtonProp, Loading, Forward {
		active?: boolean;
		circular?: boolean;
		type?: 'button'|'submit'|'reset';
		href?: string;
		approve?: boolean;
		cancel?: boolean;
	}

	let cs: string;
	$: {
		let {active, circular, approve, cancel} = $$props;
		cs = uistr('button', $$props, {active, circular, approve, cancel}, buttonProp, loading);
	}
	
	export let type: 'button'|'submit'|'reset' = 'button';
	export let href: string = '';
	/* TODO :
		- animated
		- icon
		- label
		- toggle
	*/
</script>
{#if href}
	<a tabindex="0" {href} class={cs}>
		<slot />
	</a>
{:else}
	<button class={cs} {type} on:click>
		<slot />
	</button>
{/if}