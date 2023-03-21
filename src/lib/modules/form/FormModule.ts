import { getContext, setContext } from "svelte";
import { createEventDispatcher } from 'svelte';
import Module from '$svemantic/modules/Module';
import type { Readable } from "svelte/store";
import privateStore from "$svemantic/utils/privateStore";
import type { FomanticField } from "./Field.svelte";
import i18n from "$svemantic/i18n";

export type ErrorDisplay = 'inline'|'manual'|'popup';
const formContext = {};	//unique local value
export interface FormContext<T=any> {
	validate(): boolean;
	reset(): void;
	isValid(): boolean;
	tabular: boolean;
	dirty: Readable<boolean>;
	errorDisplay: ErrorDisplay;
	addField(name: string, fld: FomanticField): void;
	removeField(name: string): void;
	module(...parms: any[]): any;
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
	model?: Partial<T>;
}
export default function FormModule<T=any>(config: any) {
	const dispatch = createEventDispatcher(),
		dirty = privateStore(false);
		
	const fields = config.fields || <Fields<T>>{},
		tabular = !!config.tabular,
		errorDisplay: ErrorDisplay = config.errorDisplay || 'popup';
	let model: Partial<T> = config.model || {};
	// TODO form formatters: https://fomantic-ui.com/behaviors/form.html#formatters	(programatic intl)
	// TODO Error report: inline/.ui.messages.error/tool-tip
	const module = Module('form', Object.assign(config, {
		default: model,
		inline: errorDisplay === 'inline',
		fields,
		onInvalid(this: JQuery, errors: string[]) {
			fields[<key<T>>(<HTMLInputElement>this[0]).name]?.setErrors?.(errors);
		},
		onValid(this: JQuery) {
			fields[<key<T>>(<HTMLInputElement>this[0]).name]?.setErrors?.();
		},
		onSuccess(e: any, values: T) {
			if(config.onSubmit) config.onSubmit(context, values);
			else {
				dispatch('submit', {context, values});
				model = values;
			}
		},
		onFailure(e: any, errors: string[], field: any /*todo type*/) { dispatch('failure', {context, errors, field}); },
		onDirty() { dirty.value = true; },
		onClean() { dirty.value = false; }
	})), context: FormContext<T> = {
		tabular,
		addField(name: key<T>, fld: FomanticField) {
			if(fields[name]) fld = {
				...fields[name],
				...fld,
				rules: (fields?.[name]?.rules||[]).concat(fld.rules||[])
			};
			if(module) module('add fields', [fld]);
			config.fields[name] = fld;
		},
		removeField(name: key<T>) {
			if(module) module('remove field', name);
			delete config.fields[name];
		},
		dirty: dirty.store, errorDisplay,
		validate() { return module('validate form'); },
		isValid() { return module('is valid'); },
		reset() { module('reset'); },
		module
	};
	i18n.subscribe(v=> Object.assign(config, v.form));
	setContext<FormContext>(formContext, context);
	return module;
}