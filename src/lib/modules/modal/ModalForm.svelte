<script lang="ts" context="module">
	export type ModalFormFunction<T=any> = (init?: T)=> Promise<T|undefined>;
	export type SaveFunction<T=any> = (item: T)=> Promise<void>;
</script>
<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from 'svelte';
    import Modal, { type ModalSpecification } from './Modal.svelte';
    import FormModule from '../form/FormModule.svelte';
    import Loader from '$svemantic/elements/Loader.svelte';
    import { clastr } from '$svemantic/root';

	type T = $$Generic;

	const dispatch = createEventDispatcher();
	interface $$Props extends ModalSpecification {
		modal?: ModalFormFunction<T>;
		save?: SaveFunction<T>;
	}
	export let opened: boolean = false, save: SaveFunction<T> = ()=> Promise.resolve();
	let promise: {resolve: (answer?: T)=> void, reject: (reason: any)=> void}|null = null;
	function answer(answer?: T) {
		if(!promise) return;
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
		opened = true;
		return new Promise<T|undefined>((resolve, reject)=> { promise = {resolve, reject}; });
	}
	// TODO: on:hide always cancel if not answering
	function deny() {
		answer();
		dispatch('deny');
	}
	async function submit({detail}: CustomEvent) {
		saving = true;
		try {
			await save(<T>detail.values);
			answer(<T>detail.values);
			opened = false;
			dispatch('submit', detail);
		} finally {
			saving = false;
		}
		
	}
	let node: HTMLElement, saving = false;
	let cs: string;
	$: cs = clastr('form', $$props);
</script>
<FormModule {node} on:failure on:submit={submit}>
	<Modal bind:node bind:opened on:show on:visible on:hide on:hidden on:deny={deny} {...$$restProps} class={cs}>
		<Loader inverted loading={saving} />
		<slot name="header" slot="header" />
		<!--slot name="image" slot="image" /-->
		<slot name="actions" slot="actions" />
		<slot />
	</Modal>
</FormModule>