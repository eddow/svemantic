<script lang="ts" context="module">
	export type ModalFormFunction<T=any> = (init?: Partial<T>)=> Promise<T|undefined>;
	export type ModalSaveFunction<T=any> = (item: T)=> Promise<void>;
	export class NotSaved extends Error {}
</script>
<script lang="ts">
	import { createEventDispatcher, onMount, type ComponentProps } from 'svelte';
    import Modal, { type ModalSpecification } from './Modal.svelte';
    import FormModule, { type FormContext, type FormSpecifications } from '../form/FormModule';
    import Loader from '$svemantic/elements/Loader.svelte';
    import { clastr } from '$svemantic/root';
    import { toast } from '../messages';
    import { writable } from 'svelte/store';

	type T = $$Generic;

	const dispatch = createEventDispatcher();
	interface $$Props extends ModalSpecification, FormSpecifications<T> {
		modal?: ModalFormFunction<T>;
		save?: ModalSaveFunction<T>;
		show?(): void;
		hide?(): void;
	}
	export let save: ModalSaveFunction<T> = ()=> Promise.resolve(), model: Partial<T>|undefined = undefined;
	const modelStore = writable<Partial<T>>();
	$: modelStore.set(model||{});
	let promise: {resolve: (answer?: T)=> void, reject: (reason: any)=> void}|null = null;
	function answer(answer?: T) {
		if(!promise) return;
		if(answer) promise.resolve(answer);
		else promise.resolve()
		promise = null;
	}
	export function modal(init?: Partial<T>) {
		if(!!promise) {
			console.assert(false, "Modal opened twice");
			promise.reject('Modal re-entrance');
		}

		model = init || {};
		return new Promise<T|undefined>((resolve, reject)=> { promise = {resolve, reject}; });
	}
	export let show = ()=> {}, hide = ()=> {};
	// TODO: on:hide dirty-> "Are you sure you want to lose your changes?"
	function deny() {
		//hide();
		answer();
		dispatch('deny');
	}
	function hidden() {
		answer();
		dispatch('hidden');
		model = undefined;
	}
	const {module, forward} = FormModule({
		...$$props,
		async onSubmit(values: T, context: FormContext) {
			saving = true;
			try {
				await save(values);
				answer(values);
				dispatch('submit', {values, context});
				model = undefined;
			} catch(x) {
				if(!(x instanceof NotSaved))
					throw x;
				toast({message: x.message, class: 'error'});
			} finally {
				saving = false;
			}
		}
	}, modelStore);
	let cs: string, saving = false;
	$: cs = clastr('form', $$props);``
</script>
<Modal form={module} opened={!!model} bind:show bind:hide on:show on:visible on:hide on:hidden={hidden} on:deny={deny} {...$$restProps} class={cs}>
	<Loader inverted loading={saving} />
	<slot name="header" slot="header" />
	<!--slot name="image" slot="image" /-->
	<slot name="actions" slot="actions" />
	<slot />
</Modal>