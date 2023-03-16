<script lang="ts">
    import SlotFragment from "$lib/SlotFragment.svelte";
    import DropDown from "./DropDown.svelte";
	import { createEventDispatcher, type ComponentProps } from 'svelte';
    import { frwstr, type Forward } from "$lib/classes";

	const dispatch = createEventDispatcher();
	interface $$Props extends ComponentProps<DropDown>, Forward {
		value?: string;
	}
	export let value: string = '',
		module: SemanticUI.Dropdown = <SemanticUI.Dropdown>Object.assign(()=> {}, {settings: {}});
	$: module('set selected', value);

	function change({detail: {value: newV}}: any) {
		dispatch('change', newV)
		value = newV;
	}
	let cs: string;
	$: cs = frwstr($$props, ['selection']);
</script>
<DropDown class={cs} {...$$restProps} on:change={change} bind:module>
	{#if $$slots.toggle}
		<SlotFragment slot="toggle">
			<slot name="toggle" />
		</SlotFragment>
	{/if}
	{#if $$slots.menu}
		<SlotFragment slot="menu">
			<slot name="menu" />
		</SlotFragment>
	{:else}
		{#if $$slots.header}
			<SlotFragment slot="header">
				<slot name="header" />
			</SlotFragment>
		{/if}
		{#if $$slots.item}
			<SlotFragment slot="item" let:key>
				<slot name="item" {key} />
			</SlotFragment>
		{/if}
	{/if}
</DropDown>