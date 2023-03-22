<script lang="ts" context="module">
	import { uistr, semantic, type Forward } from "$svemantic/root";
	import { createEventDispatcher } from 'svelte';
    import Icon, { type IconSpec } from "$svemantic/elements/Icon.svelte";
    import i18n from "$svemantic/i18n";
    import Module from "$svemantic/modules/Module";
	import { field } from "$svemantic/i18n";

	export interface DropdownOption {
		disabled?: true, // whether value should be disabled
		name?: string, // displayed dropdown text
		description?: string, // displayed dropdown description
		descriptionVertical?: boolean, // whether description should be vertical
		value: string, // actual dropdown value
		text?: string, // displayed text when selected
		display?: string, // cfr. globalConfig.SemanticUiOptions
		type?: string, //? type of dropdown element
		image?: string, // optional image path
		imageClass?: string, // optional individual class for image
		icon?: string, // optional icon name
		iconClass?: string, // optional individual class for icon (for example to use flag instead)
		class?: string, // optional individual class for item/header
		divider?: boolean, // optional divider append for group headers
		actionable?: boolean // optional actionable item
	}
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
		placeholder?: string | 'auto' | 'value' | boolean;
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
	export const globalConfig = {
		SemanticUiOptions: false	// If set to true, uses {text, name} instead of {display, text} to choose the displayed values resp when selected/in the list
	}
</script>
<script lang="ts">
	interface $$Props extends Forward, DropdownSettings {
		icon?: IconSpec;
		action?: 'activate' | 'select' | 'combo' | 'nothing' | 'hide' | ((text: string, value: string | false, element: JQuery) => void);
		options?: any;
		module?: SemanticUI.Dropdown;
		search?: boolean;
		clearable?: boolean;
		multiple?: boolean;
		transparent?: boolean;
		el?: string;
		name?: string;
	}

	const
		dispatch = createEventDispatcher();
	export let
		name: string = '',
		icon: IconSpec = 'dropdown',
		options: DropdownOption[]|undefined = undefined,
		transparent: boolean = false,
		el: string = 'div',
		placeholder: string|boolean = '';

	function transform(options: DropdownOption[]) {
		return globalConfig.SemanticUiOptions ? options :
			options.map(({text, display, ...cnf})=> ({...(display?{text: display}:{}), ...{name: text, ...cnf}}));
	}
	field(name, placeholder, v=> placeholder = v);
	const config: any = {
		values:options && transform(options),
		placeholder,
		onChange: (value: any, text: string)=> { dispatch('change', {value, text}); },
		onAdd: (value: any, text: string)=> { dispatch('add', {value, text}); },
		onRemove: (value: any, text: string)=> { dispatch('remove', {value, text}); },
		onNoResults: (search: any)=> { dispatch('no-result', {search}); },
		...$$restProps
	};
	export const module = Module('dropdown', config);
	$: config.values = options && transform(options);
	$: config.message = $i18n.dropdown;	//? reactive?
	let cs: string;
	$: {
		let {search, clearable, multiple} = $$props;
		cs = uistr('dropdown', $$props, {search, clearable, multiple, transparent});
	}
	// TODO Dropdown sub: Text helpers
</script>
<svelte:element this={el}  class={cs} use:module use:semantic={$$props}>
	{#if name}<input type="hidden" {name}>{/if}
	<slot name="toggle">
		<slot name="text" />
		{#if icon}<Icon {icon} />{/if}
	</slot>
	<slot>
		<div class="menu">
			<slot name="menu" />
		</div>
	</slot>
</svelte:element>
<style lang="scss" global>
	.ui.transparent.dropdown {
		border-width: 1px 0 0 0;
		border-radius: 0;
	}
</style>