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
	export interface DropdownSettings {	// https://fomantic-ui.com/modules/dropdown.html#frequently-used-settings
		on?: 'click'|'hover'|'custom';
		clearable?: boolean;
        ignoreCase?: boolean;
        ignoreSearchCase?: boolean;
		allowReselection?: boolean;
		allowAdditions?: boolean;
		hideAdditions?: boolean;
		action?: 'activate' | 'select' | 'combo' | 'nothing' | 'hide' | ((text: string, value: string | false, element: JQuery) => void);
		minCharacters?: number;
		match?: 'both' | 'value' | 'text';
		selectOnKeydown?: boolean;
		forceSelection?: boolean;
		allowCategorySelection?: boolean;
		fireOnInit?: boolean;
		placeholder?: string | 'auto' | 'value' | boolean;
		ignoreDiacritics?: boolean;

		multiple?: boolean;
		useLabels?: boolean;
		delimiter?: string;
		maxSelections?: false | number;
		glyphWidth?: number;
		headerDivider?: boolean;
		collapseOnActionable?: boolean;
		label?: SemanticUI.Dropdown.LabelSettings;

		search?: boolean;
		direction?: 'auto' | 'upward' | 'downward';
		keepOnScreen?: boolean;
		context?: string | JQuery;
		fullTextSearch?: boolean | 'exact';
		hideDividers?: boolean|'empty';
		preserveHTML?: boolean;
		sortSelect?: true|'natural'|((a: any, b: any)=> number);
		showOnFocus?: boolean;
		allowTab?: boolean;
		transition?: 'auto' | string;
		duration?: number;
		displayType?: string|false;
		delay?: SemanticUI.Dropdown.DelaySettings;
	}
	export const globalConfig = {
		SemanticUiOptions: false	// If set to true, uses {text, name} instead of {display, text} to choose the displayed values resp when selected/in the list
	}
	export type DropdownEvent = CustomEvent<{value: string, text: string}>
</script>
<script lang="ts">
	interface $$Props extends Forward, DropdownSettings {
		icon?: IconSpec;
		options?: any;
		module?: SemanticUI.Dropdown;
		transparent?: boolean;
		fluid?: boolean;
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
		placeholder: string|boolean = '',
		hideDividers: boolean|'empty' = 'empty';

	function transform(options: DropdownOption[]) {
		return globalConfig.SemanticUiOptions ? options :
			options.map(({text, display, ...cnf})=> ({...(display?{text: display}:{}), ...{name: text, ...cnf}}));
	}
	const config: any = {
		values:options && transform(options),
		placeholder, hideDividers,
		onChange (value: any, text: string) { dispatch('change', {value, text}); },
		onAdd (value: any, text: string) { dispatch('add', {value, text}); },
		onRemove(value: any, text: string) { dispatch('remove', {value, text}); },
		onNoResults(search: any) { dispatch('no-result', {search}); },
		onShow() { return dispatch('show', null, {cancelable: true}); },
		onHide() { return dispatch('hide', null, {cancelable: true}); },
		onSearch() { return dispatch('search', null, {cancelable: true}); },
		...$$restProps
	};
	export const module = Module('dropdown', config);
	$: config.values = options && transform(options);
	$: config.message = $i18n.dropdown;	//? reactive?
	let cs: string;
	$: {
		let {search, clearable, multiple, fluid} = $$props;
		cs = uistr('dropdown', $$props, {search, clearable, multiple, transparent, fluid});
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