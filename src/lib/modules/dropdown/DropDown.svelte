<script lang="ts">
	import { uistr, type Forward } from "$lib/classes";
	import { createEventDispatcher } from 'svelte';
    import Icon from "$lib/elements/Icon.svelte";
    import i18n from "$lib/i18n";
    import Module from "../Module.svelte";

	interface $$Props extends Forward, Dropdown.Settings {
		items?: any[];
		icon?: string|string[];
		action?: 'activate' | 'select' | 'combo' | 'nothing' | 'hide' | ((text: string, value: string | false, element: JQuery) => void);
		values?: any;
		module?: SemanticUI.Dropdown;
	}

	export let items: any[] = [],
		name: string = '',
		icon: string|string[] = 'dropdown',
		values: any = null,
		placeholder: string | false | undefined = undefined;

	let node: HTMLDivElement;

	const dispatch = createEventDispatcher();
	export let config: SemanticUI.DropdownSettings = Object.assign({}, $$restProps, {
		onChange: (value: any, text: string)=> { dispatch('change', {value, text}); },
		onAdd: (value: any, text: string)=> { dispatch('add', {value, text}); },
		onRemove: (value: any, text: string)=> { dispatch('remove', {value, text}); },
		onNoResults: (search: any)=> { dispatch('no-result', {search}); }
	});
	if(values) config.values = values;
	if(placeholder !== undefined) config.placeholder = placeholder;
	$: config.message = $i18n.dropdown
	export let module: (...parms: any[])=> any = ()=> {};
	let cs: string;
	$: cs = uistr('dropdown', $$props);
	let keys: string[];
	$: keys = items && items instanceof Array ? items : Object.keys(items);
</script>
<Module {node} {config} access="dropdown" bind:module>
	<div class={cs} bind:this={node}>
		{#if name}<input type="hidden" {name}>{/if}
		<slot name="toggle">
			<Icon {icon} />
			<div class="default text">{placeholder}</div>
		</slot>
		{#if !values}
			<div class="menu">
				<slot name="menu">
					<slot name="header" />
					{#each keys as key}
						<slot name="item" key={key}>
							{#if items instanceof Array}
								<div class="item">{keys}</div>
							{:else}
								<div class="item" data-value={key}>{items[key]}</div>
							{/if}
						</slot>
					{/each}
				</slot>
			</div>
		{/if}
	</div>
</Module>