import { getContext, setContext } from "svelte";
import { createEventDispatcher } from 'svelte';
import Module from '$svemantic/modules/Module';
import type { Readable, Writable } from "svelte/store";
import type { FomanticField } from "./Field.svelte";
import i18n from "$svemantic/i18n";
import privateStore from "$svemantic/utils/privateStore";

export type ErrorDisplay = 'inline'|'manual'|'popup';
const formContext = Symbol('form context key');	//unique local value
export interface FormContext<T=any> {
	model: Writable<Partial<T>>
	dirty: Readable<boolean>
	errorDisplay: ErrorDisplay
	tabular: boolean
	validate(): boolean
	reset(): void
	cancel(): void
	isValid(): boolean
	addField(name: string, fld: FomanticField): void
	removeField(name: string): void
	forward: Readable<(...parms: any[])=> any>
}
export function getForm<T=any>() {
	return getContext<FormContext<T>>(formContext);
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
	'error-display'?: ErrorDisplay;
	model?: Partial<T>;
}
export default function FormModule<T=any>(config: any, model: Writable<Partial<T>>) {
	const dispatch = createEventDispatcher(),
		dirty = privateStore(false);
		
	const fields = config.fields || <Fields<T>>{},
		tabular = !!config.tabular,
		errorDisplay: ErrorDisplay = config['error-display'] || 'popup';
	// TODO form formatters: https://fomantic-ui.com/behaviors/form.html#formatters	(programatic intl)
	// TODO tr.error displays the whole row redish, not only the erroneous fields (td): the whole row
	const {module, forward} = Module('form', Object.assign(config, {
		inline: errorDisplay === 'inline',
		fields,
		onInvalid(this: JQuery, errors: string[]) {
			fields[<key<T>>(<HTMLInputElement>this[0]).name]?.setErrors?.(errors);
		},
		onValid(this: JQuery) {
			fields[<key<T>>(<HTMLInputElement>this[0]).name]?.setErrors?.();
		},
		onSuccess(e: any, values: T) {
			if(config.onSubmit) config.onSubmit(values, context);
			else {
				dispatch('submit', {values, context});
			}
		},
		onFailure(e: any, errors: string[], fields: any /*todo type*/) {
			dispatch('failure', {context, errors, fields});
		},
		onDirty() { dirty.value = true; },
		onClean() { dirty.value = false; }
	})), context: FormContext<T> = {
		model,
		tabular,
		errorDisplay,
		dirty: dirty.store,
		addField(name: key<T>, fld: FomanticField) {
			if(fields[name]) fld = {
				...fields[name],
				...fld,
				rules: (fields?.[name]?.rules||[]).concat(fld.rules||[])
			};
			config.fields[name] = fld;
		},
		removeField(name: key<T>) {
			delete config.fields[name];
		},
		cancel() { dispatch('cancel') },
		validate() { return module('validate form'); },
		isValid() { return module('is valid'); },
		reset() { module('reset'); },
		forward
	};
	i18n.subscribe(v=> Object.assign(config, v.form));
	setContext<FormContext<T>>(formContext, context);
	return {module, forward, dirty: dirty.store};
}