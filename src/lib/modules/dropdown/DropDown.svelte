<script lang="ts" context="module">
	export interface DropdownSettings {
		on?: string;
		allowReselection?: boolean;
		allowAdditions?: boolean;
		hideAdditions?: boolean;
		minCharacters?: number;
		match?: 'both' | 'value' | 'text';
		selectOnKeydown?: boolean;
		forceSelection?: boolean;
		allowCategorySelection?: boolean;
		placeholder?: string | 'auto' | 'value' | false;
		useLabels?: boolean;
		maxSelections?: false | number;
		label?: SemanticUI.Dropdown.LabelSettings;
		direction?: 'auto' | 'upward' | 'downward';
		keepOnScreen?: boolean;
		context?: string | JQuery;
		fullTextSearch?: boolean | 'exact';
		preserveHTML?: boolean;
		showOnFocus?: boolean;
		allowTab?: boolean;
		transition?: 'auto' | string;
		duration?: number;
		keys?: SemanticUI.Dropdown.KeySettings;
		delay?: SemanticUI.Dropdown.DelaySettings;

		className?: SemanticUI.Dropdown.ClassNameSettings;
	}
</script>
<script lang="ts">
	import { uistr, semantic, type Forward } from "$svemantic/root";
	import { createEventDispatcher } from 'svelte';
    import Icon, { type IconSpec } from "$svemantic/elements/Icon.svelte";
    import i18n from "$svemantic/i18n";
    import Module from "$svemantic/modules/Module";

	interface $$Props extends Forward, DropdownSettings {
		items?: any[];
		icon?: IconSpec;
		action?: 'activate' | 'select' | 'combo' | 'nothing' | 'hide' | ((text: string, value: string | false, element: JQuery) => void);
		values?: any;
		module?: SemanticUI.Dropdown;
		search?: boolean;
		clearable?: boolean;
		multiple?: boolean;
	}

	export let items: any[] = [],
		name: string = '',
		icon: IconSpec = 'dropdown',
		values: any[]|undefined = undefined,
		placeholder: string | false | undefined = undefined;

	const dispatch = createEventDispatcher();
	const config: any = {
		onChange: (value: any, text: string)=> { dispatch('change', {value, text}); },
		onAdd: (value: any, text: string)=> { dispatch('add', {value, text}); },
		onRemove: (value: any, text: string)=> { dispatch('remove', {value, text}); },
		onNoResults: (search: any)=> { dispatch('no-result', {search}); },
		...$$restProps
	};
	export const module = Module('dropdown', config);
	if(values) config.values = values;
	if(placeholder !== undefined) config.placeholder = placeholder;
	$: config.message = $i18n.dropdown;	//? reactive?
	let cs: string;
	$: {
		let {search, clearable, multiple} = $$props;
		cs = uistr('dropdown', $$props, {search, clearable, multiple});
	}
	// TODO Dropdown sub: Text helpers
</script>
<div class={cs} use:module use:semantic={$$props}>
	{#if name}<input type="hidden" {name}>{/if}
	<slot name="toggle">
		<slot name="text" />
		{#if icon}<Icon {icon} />{/if}
	</slot>
	<slot name="menu">
		{#if !values}
			<div class="menu">
				<slot name="header" />
				{#each items as item}
					<slot name="item" {item}>
						<div class="item" data-value={item.value}>{item.name}</div>
					</slot>
				{/each}
			</div>
		{/if}
	</slot>
</div>