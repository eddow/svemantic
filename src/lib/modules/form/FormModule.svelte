<script lang="ts" context="module">
    import { getContext, setContext } from "svelte";

	export type ErrorDisplay = 'inline'|'manual'|'popup';
	const formContext = {};	//unique local value
	export interface FormContext<T=any> {
		validate(): boolean;
		reset(): void;
		isValid(): boolean;
		tabular: boolean;
		dirty: Readable<boolean>;
		values: T;
		errorDisplay: ErrorDisplay;
		addField(name: string, fld: FomanticField): void;
		removeField(name: string): void;
	}
	export function getForm(): FormContext {
		return getContext<FormContext>(formContext);
	}
	type key<T> = string & keyof T;
	type Fields<T> = Partial<Record<key<T>, FomanticField>>;
	export interface FormSpecifications<T> {
		tabular?: boolean;
		keyboardShortcuts?: boolean;
		on?: 'submit' | 'blur' | 'change';
		revalidate?: boolean;
		delay?: boolean;
		transition?: string;
		duration?: number;
		fields?: Fields<T>;
		rules?: {
			[name: string]: (this: HTMLElement, ...args: any[]) => boolean;
		};
		element?: string;
		errorDisplay?: ErrorDisplay;
	}
</script>
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import Module from '$svemantic/modules/Module.svelte';
    import type { Readable } from "svelte/store";
    import privateStore from "$svemantic/utils/privateStore";
    import i18n from "$svemantic/i18n";
    import type { FomanticField } from "./Field.svelte";

	type T = $$Generic;

	const dispatch = createEventDispatcher(),
		dirty = privateStore(false);
		
	let module: (...parms: any[])=> any = ()=> {}, fieldsSpec = <Fields<T>>{};
	export let node: HTMLElement, tabular: boolean = false, errorDisplay: ErrorDisplay = 'popup', model: Partial<T> = {};
	export {fieldsSpec as fields};
	let fields = <Fields<T>>{};
	interface $$Props extends FormSpecifications<T> {
		node: HTMLElement;
	}
	$: module('set values', model);
	// TODO form formatters: https://fomantic-ui.com/behaviors/form.html#formatters	(programatic intl)
	// TODO Error report: inline/.ui.messages.error/tool-tip
	const context = {
		dirty: dirty.store, errorDisplay,
		validate() { return module('validate form'); },
		isValid() { return module('is valid'); },
		reset() { module('reset'); },
		get values(): T { return module('get values'); },
		set values(v: T) { module('set values', v); }
	}, config = {
		...$$props,
		default: model,
		inline: errorDisplay === 'inline',
		fields,
		onInvalid(this: JQuery, errors: string[]) {
			fields[<key<T>>(<HTMLInputElement>this[0]).name]?.setErrors?.(errors);
		},
		onValid(this: JQuery, errors: string[]) {
			fields[<key<T>>(<HTMLInputElement>this[0]).name]?.setErrors?.();
		},
		onSuccess(e: any, values: T) {
			dispatch('submit', {context, values});
			model = values;
		},
		onFailure(e: any, errors: string[], field: any /*todo type*/) { dispatch('failure', {context, errors, field}); },
		onDirty() { dirty.value = true; },
		onClean() { dirty.value = false; }
	};
	$: Object.assign(config, $i18n.form);	//? reactive?
	setContext<FormContext>(formContext, Object.assign(Object.create(context), {
		tabular,
		addField(name: key<T>, fld: FomanticField) {
			if(fieldsSpec[name]) fld = {
				...fieldsSpec[name],
				...fld,
				rules: (fieldsSpec?.[name]?.rules||[]).concat(fld.rules||[])
			};
			if(module) module('add fields', [fld]);
			config.fields[name] = fld;
		},
		removeField(name: key<T>) {
			if(module) module('remove field', name);
			delete config.fields[name];
		},
	}));
	// TODO bind an object as a value
</script>
<Module {node} {config} access="form" bind:module>
	<slot />
</Module>
