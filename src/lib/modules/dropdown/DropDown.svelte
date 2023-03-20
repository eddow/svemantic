<script lang="ts" context="module">
	export interface DropdownSettings {

		// region Frequently Used Settings

		/**
		 * Event used to trigger dropdown (Hover, Click, Custom Event)
		 *
		 * @default 'click'
		 */
		on?: string;
		/**
		 * When set to true will fire onChange even when the value a user select matches the currently selected value.
		 *
		 * @default false
		 */
		allowReselection?: boolean;
		/**
		 * Whether search selection should allow users to add their own selections, works for single or multi-select.
		 *
		 * @default false
		 */
		allowAdditions?: boolean;
		/**
		 * When disabled user additions will appear in the results menu using a specially formatted selection item formatted by templates.addition.
		 *
		 * @default true
		 */
		hideAdditions?: boolean;
		/**
		 * The minimum characters for a search to begin showing results
		 *
		 * @default 1
		 */
		minCharacters?: number;
		/**
		 * When using search selection specifies how to match values.
		 *
		 * @default 'both'
		 */
		match?: 'both' | 'value' | 'text';
		/**
		 * Whether dropdown should select new option when using keyboard shortcuts. Setting to false will require enter or left click to confirm a choice.
		 *
		 * @default true
		 */
		selectOnKeydown?: boolean;
		/**
		 * Whether search selection will force currently selected choice when element is blurred.
		 *
		 * @default true
		 */
		forceSelection?: boolean;
		/**
		 * Whether menu items with sub-menus (categories) should be selectable
		 *
		 * @default false
		 */
		allowCategorySelection?: boolean;
		/**
		 * @default 'auto'
		 */
		placeholder?: string | 'auto' | 'value' | false;

		// endregion

		// region Multiple Select Settings

		/**
		 * Whether multiselect should use labels. Must be set to true when allowAdditions is true
		 *
		 * @default true
		 */
		useLabels?: boolean;
		/**
		 * When set to a number, sets the maximum number of selections
		 *
		 * @default false
		 */
		maxSelections?: false | number;
		/**
		 * Maximum glyph width, used to calculate search size. This is usually size of a "W" in your font in em
		 *
		 * @default 1.0714
		 */
		glyphWidth?: number;
		/**
		 * Allows customization of multi-select labels
		 */
		label?: SemanticUI.Dropdown.LabelSettings;

		// endregion

		// region Additional Settings

		/**
		 * When set to auto determines direction based on whether dropdown can fit on screen. Set to upward or downward to always force a direction.
		 *
		 * @default 'auto'
		 */
		direction?: 'auto' | 'upward' | 'downward';
		/**
		 * Whether dropdown should try to keep itself on screen by checking whether menus display position in its context (Default context is page).
		 *
		 * @default true
		 */
		keepOnScreen?: boolean;
		/**
		 * Element context to use when checking whether can show when keepOnScreen: true
		 *
		 * @default 'window'
		 */
		context?: string | JQuery;
		/**
		 * Specifying to "true" will use a fuzzy full text search, setting to "exact" will force the exact search to be matched somewhere in the string
		 *
		 * @default false
		 */
		fullTextSearch?: boolean | 'exact';
		/**
		 * Whether HTML included in dropdown values should be preserved. (Allows icons to show up in selected value)
		 *
		 * @default true
		 */
		preserveHTML?: boolean;
		/**
		 * Whether to show dropdown menu automatically on element focus.
		 *
		 * @default true
		 */
		showOnFocus?: boolean;
		/**
		 * Whether to allow the element to be navigable by keyboard, by automatically creating a tabindex
		 *
		 * @default true
		 */
		allowTab?: boolean;
		/**
		 * Named transition to use when animating menu in and out.
		 * Defaults to slide down or slide up depending on dropdown direction.
		 * Fade and slide down are available without including ui transitions
		 *
		 * @default 'auto'
		 * @see {@link http://semantic-ui.com/modules/transition.html}
		 */
		transition?: 'auto' | string;
		/**
		 * Duration of animation events
		 *
		 * @default 200
		 */
		duration?: number;
		/**
		 * The keycode used to represent keyboard shortcuts. To avoid issues with some foreign languages, you can pass false for comma delimiter's value
		 */
		keys?: SemanticUI.Dropdown.KeySettings;
		/**
		 * Time in milliseconds to debounce show or hide behavior when on: hover is used, or when touch is used.
		 */
		delay?: SemanticUI.Dropdown.DelaySettings;

		// endregion
		className?: SemanticUI.Dropdown.ClassNameSettings;
	}
</script>
<script lang="ts">
	import { uistr, semantic, type Forward } from "$svemantic/root";
	import { createEventDispatcher } from 'svelte';
    import Icon, { type IconSpec } from "$svemantic/elements/Icon.svelte";
    import i18n from "$svemantic/i18n";
    import Module from "$svemantic/modules/Module.svelte";

	interface $$Props extends Forward, DropdownSettings {
		items?: any[];
		icon?: IconSpec;
		action?: 'activate' | 'select' | 'combo' | 'nothing' | 'hide' | ((text: string, value: string | false, element: JQuery) => void);
		values?: any;
		module?: SemanticUI.Dropdown;
		search?: boolean;
		clearable?: boolean;
		multiple?: boolean;
		node?: HTMLElement
	}

	export let items: any[] = [],
		name: string = '',
		icon: IconSpec = 'dropdown',
		values: any = null,
		placeholder: string | false | undefined = undefined,
		node: HTMLElement|undefined = undefined;

	const dispatch = createEventDispatcher();
	const config: SemanticUI.DropdownSettings = {
		onChange: (value: any, text: string)=> { dispatch('change', {value, text}); },
		onAdd: (value: any, text: string)=> { dispatch('add', {value, text}); },
		onRemove: (value: any, text: string)=> { dispatch('remove', {value, text}); },
		onNoResults: (search: any)=> { dispatch('no-result', {search}); },
		...$$restProps
	};
	if(values) config.values = values;
	if(placeholder !== undefined) config.placeholder = placeholder;
	$: config.message = $i18n.dropdown;	//? reactive?
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
	</slot>
</Module>