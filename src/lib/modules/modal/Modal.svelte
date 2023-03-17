<script lang="ts">
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { uistr, type Forward } from "$lib/classes";
	import { createEventDispatcher } from 'svelte';
    import Module from '../Module.svelte';
/*
	header: center aligned, basic
	content: image, center aligned
	actions: left, center aligned, basic
	*/
	const dispatch = createEventDispatcher();
	interface $$Props extends Size, Color, Forward, Modal.Settings {
		inverted?: boolean;
		basic?: boolean;
		fullscreen?: boolean;
		long?: boolean;
		longer?: boolean;
		scrolling?: boolean;
	}
	let module: (...parms: any[])=> any;
	const config: SemanticUI.ModalSettings = <SemanticUI.ModalSettings>Object.assign({}, $$props, {
		onShow() { dispatch('show'); },
		onVisible() { dispatch('visible'); },
		onHide() { return dispatch('hide', null, {cancelable: true}); },
		onHidden() { dispatch('hidden'); answer(); },
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
	let node: HTMLElement|undefined = undefined;
	let promise: {resolve: (answer?: boolean)=> void, reject: (reason: any)=> void}|null = null;
	function answer(answer?: boolean) {
		if(!promise) {
			console.assert(false, 'Answering not-shown modal');
			return;
		}
		try {
			promise.resolve(answer);
		} finally {
			promise = null;
		}
	}
	export function modal() {
		if(!!promise) {
			console.assert(false, "Modal opened twice");
			promise.reject('Modal re-entrance');
		}
		return new Promise<boolean|undefined>((resolve, reject)=> { promise = {resolve, reject}; });
	}
	export let closable: boolean = true, title: string = '';
	let contentCls = ($$slots.image ? 'image ' : '') + 'content'
</script>
<div class={cs}><slot /></div>
<Module {node} {config} access="modal" bind:module>
	<div class={cs} bind:this={node}><div class="ui modal">
		{#if closable}<i class="close icon"></i>{/if}
		<div class="header">
			<slot name="header">
				{title}
			</slot>
		</div>
		<div class={contentCls}>
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
			<div class="actions">
				<slot name="actions" />
			</div>
		{/if}
	</div>
</Module>