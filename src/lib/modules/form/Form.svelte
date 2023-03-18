<script lang="ts" context="module">
    import { getContext, setContext } from "svelte";

	const formContext = {};	//unique local value
	export interface FormContext<T=any> {
		validate(): boolean;
		reset(): void;
		isValid(): boolean;
		tabular: boolean;
		dirty: Readable<boolean>;
		values: T;
		addField(name: string, fld: SveMantic.Field): void;
		removeField(name: string): void;
	}
	export function getForm(): FormContext {
		return getContext<FormContext>(formContext);
	}
</script>
<script lang="ts">
    import { uistr, type Forward, semantic } from "$lib/root";
	import { createEventDispatcher } from 'svelte';
    import Module from '$lib/modules/Module.svelte';
    import type { Readable } from "svelte/store";
    import privateStore from "$lib/utils/privateStore";
    import i18n from "$lib/i18n";

	type T = $$Generic;

	const dispatch = createEventDispatcher(),
		dirty = privateStore(false);
		
	let module: (...parms: any[])=> any;
	let node: HTMLElement|undefined = undefined;
	export let tabular: boolean = true, element: string = tabular ? 'tr' : 'div';
	interface $$Props extends Forward {
		tabular?: boolean;
	}
	const config = Object.assign({}, $$props, {
		fields: <Record<string, SveMantic.Field>>{},
		onSuccess(e: any, fields: any) { dispatch('submit', fields); },
		onDirty() { dirty.value = true; },
		onClean() { dirty.value = false; }
	});
	$: Object.assign(config, $i18n.form);	//? reactive?
	setContext<FormContext>(formContext, {
		tabular,
		dirty: dirty.store,
		validate() { return module('validate form'); },
		isValid() { return module('is valid'); },
		reset() { module('reset'); },
		get values(): T { return module('get values'); },
		set values(v: T) { module('set values', v); },
		addField(name: string, fld: SveMantic.Field) {
			if(module) module('add fields', [fld]);
			config.fields[name] = fld;
		},
		removeField(name) {
			if(module) module('remove field', name);
			delete config.fields[name];
		},
	});
	let cs: string;
	$: cs = uistr('form', $$props);
</script>
<Module {node} {config} access="form" bind:module>
	<svelte:element this={element} class={cs} use:semantic={$$props} bind:this={node}>
		<slot />
	</svelte:element>
</Module>
