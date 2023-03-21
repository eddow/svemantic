<script lang="ts" context="module">
	export interface ModalSettings {
		detachable?: boolean;
		autofocus?: boolean;
		observeChanges?: boolean;
		allowMultiple?: boolean;
		keyboardShortcuts?: boolean;
		offset?: number;
		context?: HTMLElement;
		closable?: boolean;
		dimmerSettings?: SemanticUI.DimmerSettings;
		transition?: string;
		duration?: number;
		queue?: boolean;
	}
	export interface ModalSpecification extends Forward, Size, Color, ModalSettings {
		basic?: boolean;
		fullscreen?: boolean;
		long?: boolean;
		longer?: boolean;
		scrolling?: boolean;
		leftActions?: boolean;
		centered?: boolean;
		opened?: boolean;
	}

	export type ModalFunction = ()=> Promise<boolean|undefined>;
</script>
<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { uistr, combine, type Forward, semantic } from "$svemantic/root";
	import { createEventDispatcher } from 'svelte';
    import Module from '$svemantic/modules/Module.svelte';

	const dispatch = createEventDispatcher();
	interface $$Props extends ModalSpecification {
		modal?: ModalFunction;
		show?: ()=>void;
		hide?: ()=>void;
		node?: HTMLElement;
	}
	export let context: HTMLElement|undefined = undefined, opened: boolean = false;
	let module: (...parms: any[])=> any;
	const config = Object.assign({}, $$props,
		context ? {context: jQuery(context)} : {}, {
		onShow() { dispatch('show'); },
		onVisible() { opened = true; dispatch('visible'); },
		onHide() { return dispatch('hide', null, {cancelable: true}); },
		onHidden() { opened = false; dispatch('hidden'); answer(); },
		onApprove() { dispatch('approve'); answer(true); },
		onDeny() { dispatch('deny'); answer(false); }
	});
	let cs: string;
	$: {
		let {inverted, basic, fullscreen, long, longer, scrolling} = $$props;
		cs = uistr('modal', $$props, [
			{inverted, basic, fullscreen, long, longer: longer||scrolling}
		], size, color);
	}
	export let node: HTMLElement|undefined = undefined;
	let promise: {resolve: (answer?: boolean)=> void, reject: (reason: any)=> void}|null = null;
	function answer(answer?: boolean) {
		if(!promise) return;
		try {
			promise.resolve(answer);
		} finally {
			promise = null;
		}
	}
	let prvOpened = false;
	$: if(opened !== prvOpened) {
		if(opened) show();
		else hide();
	}
	export function show() { module('show'); }
	export function hide() { module('hide'); }
	export function modal() {
		if(!!promise) {
			console.assert(false, "Modal opened twice");
			promise.reject('Modal re-entrance');
		}
		show();
		return new Promise<boolean|undefined>((resolve, reject)=> { promise = {resolve, reject}; });
	}
	export let closable: boolean = true, title: string = '', leftActions: boolean = false, centered: boolean = false;
	let csss: {content: string, header: string, actions: string};
	$: csss = {
		content: combine($$slots.image ? 'image ' : '', centered && 'center aligned', 'content'),
		header: combine(centered && 'center aligned', 'header'),
		actions: combine(leftActions && 'left', centered && 'center aligned', 'actions')
	};
</script>
<Module {node} {config} access="modal" bind:module>
	<div class={cs} use:semantic={$$props} bind:this={node}>
		{#if closable}<i class="close icon"></i>{/if}
		{#if $$slots.header}
			<div class={csss.header}>
				<slot name="header">
					{title}
				</slot>
			</div>
		{/if}
		<div class={csss.content}>
			{#if $$slots.image}
				<div class="image">
					<slot name="image" />
				</div>
			{/if}
			<div class="description">
				<slot />
			</div>
		</div>
		{#if $$slots.actions}
			<div class={csss.actions}>
				<slot name="actions" />
			</div>
		{/if}
	</div>
</Module>
