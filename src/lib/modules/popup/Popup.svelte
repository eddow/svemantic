<script lang="ts" context="module">
	const emptyConfig = <PopupSettings>{};
	export interface PopupSettings extends SveMantic.PopupSettings {
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

	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { argued, semantic, uistr, type Forward } from "$lib/root";
    import { onDestroy, tick, createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	export let config: PopupSettings|undefined = undefined;	// For binding only
	let previous: boolean, node: HTMLElement|undefined = undefined, apply: HTMLElement|undefined = undefined,
		module: (...parms: any[])=> any = ()=> {};
	interface $$Props extends SveMantic.PopupSettings, Size, Color, Forward {
		config?: PopupSettings;
		flowing?: boolean;
		basic?: boolean;
		multiline?: boolean;
		wide?: boolean|'very';
	}
	async function setPrevious() {
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
		config = {
			exclusive, movePopup, observeChanges, boundary, context, scrollContext, jitter, position,
			inline, preserve, prefer, lastResort, on, delay, transition, duration, setFluidWidth,
			hoverable, closable, addTouchEvents, hideOnScroll, target, distanceAway, offset, maxSearchDepth,
			popup: node,
			onShow() { dispatch('show', null, {cancelable: true}); },
			onVisible() { dispatch('visible'); },
			onHide() { if(!dispatch('hide', null, {cancelable: true})) return false; },
			onHidden() { dispatch('hidden'); },
		};
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
		cs = uistr('popup', $$props, [
			{loading, flowing, basic, multiline},
			argued({wide})
		], size, color);
	}
	onDestroy(()=> {
		module('remove popup');
	});
</script>
<div class={cs} use:semantic={$$restProps} bind:this={node}>
	<slot />
</div>