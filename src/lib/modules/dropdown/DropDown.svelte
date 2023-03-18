<script lang="ts">
	import { uistr, semantic, type Forward } from "$lib/root";
	import { createEventDispatcher } from 'svelte';
    import Icon, { type IconSpec } from "$lib/elements/Icon.svelte";
    import i18n from "$lib/i18n";
    import Module from "$lib/modules/Module.svelte";

	interface $$Props extends Forward, Dropdown.Settings {
		items?: any[];
		icon?: IconSpec;
		action?: 'activate' | 'select' | 'combo' | 'nothing' | 'hide' | ((text: string, value: string | false, element: JQuery) => void);
		values?: any;
		module?: SemanticUI.Dropdown;
		search?: boolean;
		clearable?: boolean;
		multiple?: boolean;
		node?: HTMLElement;
	}

	export let items: any[] = [],
		name: string = '',
		icon: IconSpec = 'dropdown',
		values: any = null,
		placeholder: string | false | undefined = undefined;

	export let node: HTMLElement|undefined = undefined;

	const dispatch = createEventDispatcher();
	const config: SemanticUI.DropdownSettings = Object.assign({}, $$restProps, {
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
	$: {
		let {search, clearable, multiple} = $$props;
		cs = uistr('dropdown', $$props, {search, clearable, multiple});
	}
	// TODO Dropdown sub: Text helpers
</script>
<Module {node} {config} access="dropdown" bind:module>
	<slot {cs}>
		<div class={cs} use:semantic={$$props} bind:this={node}>
			{#if name}<input type="hidden" {name}>{/if}
			<slot name="toggle">
				<Icon {icon} />
				<slot name="text" />
			</slot>
			{#if !values}
				<div class="menu">
					<slot name="menu">
						<slot name="header" />
						{#each items as item}
							<slot name="item" {item}>
								<div class="item" data-value={item.value}>{item.name}</div>
							</slot>
						{/each}
					</slot>
				</div>
			{/if}
		</div>
	</slot>
</Module>