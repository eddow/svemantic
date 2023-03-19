<script lang="ts" context="module">
	/**
	 * What can be used on a <Popup> tag
	 */
	export interface PopupSpecifications {
		exclusive?: boolean;
		movePopup?: boolean;
		observeChanges?: boolean;
		boundary?: HTMLElement;
		context?: HTMLElement;
		scrollContext?: HTMLElement;
		jitter?: number;
		position?: string;
		inline?: boolean;
		preserve?: boolean;
		prefer?: 'adjacent' | 'opposite';
		lastResort?: boolean | string;
		on?: 'focus' | 'click' | 'hover' | 'manual';
		delay?: any;	// TODO? Popup.DelaySettings;
		transition?: string;
		duration?: number;
		setFluidWidth?: boolean;
		hoverable?: boolean;
		closable?: boolean;
		addTouchEvents?: boolean;
		hideOnScroll?: 'auto' | false;
		target?: false | HTMLElement;
		distanceAway?: number;
		offset?: number;
		maxSearchDepth?: number;
	}
	
	/**
	 * Can be used to describe a popup to Fomantic
	 */
	export interface PopupSettings extends PopupSpecifications {
		popup?: HTMLElement;
		content?: string;
		title?: string;
		variation?: string;
		onShow?(this: JQuery, $module: JQuery): false | void;
		onVisible?(this: JQuery, $module: JQuery): void;
		onHide?(this: JQuery, $module: JQuery): false | void;
		onHidden?(this: JQuery, $module: JQuery): void;
	}
	export function popup(node: HTMLElement, params?: PopupSettings|string) {
		function update(params?: PopupSettings|string) {
			if(typeof params === 'string')
				params = {content: params};
			else if(params) {
				const retyped = <Record<string, any>>params;	// Just for typescript
				for(const key of ['popup', 'boundary', 'context', 'scrollContext', 'target'])
					if(retyped[key] instanceof HTMLElement)
						retyped[key] = <JQuery<HTMLElement>>jQuery(retyped[key]);
			}
			jQuery(node).popup(<SemanticUI.PopupSettings>params);
		}
		update(params);
		return { update };
	}
</script>
<script lang="ts">
    import { browser } from '$app/environment';

	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";
    import { onDestroy, tick, createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	export let config: PopupSettings|undefined = undefined;	// For binding only
	let previous: boolean, node: HTMLElement|undefined = undefined, apply: HTMLElement|undefined = undefined,
		module: (...parms: any[])=> any = ()=> {};
	interface $$Props extends PopupSpecifications, Size, Color, Forward {
		config?: PopupSettings;
		flowing?: boolean;
		basic?: boolean;
		multiline?: boolean;
		wide?: boolean|'very';
	}
	async function setPrevious() {
		const emptyConfig = <PopupSettings>{};
		config = emptyConfig;
		await tick();
		previous = $$props.config !== emptyConfig;
	}
	if(browser) setPrevious();
	$: if(node) {
		if(previous) apply = <HTMLElement>node.previousElementSibling;
		let {
			exclusive, movePopup, observeChanges, boundary, context, scrollContext, jitter, position,
			inline, preserve, prefer, lastResort, on, delay, transition, duration, setFluidWidth,
			hoverable, closable, addTouchEvents, hideOnScroll, target, distanceAway, offset, maxSearchDepth
		} = $$props;
		Object.assign(config || (config = {}), {
			exclusive, movePopup, observeChanges, boundary, context, scrollContext, jitter, position,
			inline, preserve, prefer, lastResort, on, delay, transition, duration, setFluidWidth,
			hoverable, closable, addTouchEvents, hideOnScroll, target, distanceAway, offset, maxSearchDepth,
			popup: node,
			onShow() { dispatch('show', null, {cancelable: true}); },
			onVisible() { dispatch('visible'); },
			onHide() { if(!dispatch('hide', null, {cancelable: true})) return false; },
			onHidden() { dispatch('hidden'); },
		});
		config = config;
		if(apply) {
			const jqn = jQuery(apply);
			module = jqn.popup.bind(jqn);
			module(config);
		}
	}
	export function show() { module('show'); }
	export function hide() { module('hide'); }
	let cs: string;
	$: {
		let {loading, flowing, basic, multiline, wide} = $$props;
		cs = uistr('popup', $$props, {loading, flowing, basic, multiline, wide}, size, color);
	}
	onDestroy(()=> {
		module('remove popup');
	});
</script>
<div class={cs} use:semantic={$$restProps} bind:this={node}>
	<slot />
</div>