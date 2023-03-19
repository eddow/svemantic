<script lang="ts" context="module">
	export interface Rule {
		type: string;
		value?: any;
		prompt?: string | ((value: any)=> string);
	}
	export interface FomanticField {
		identifier: string;
		optional: boolean;
		rules: Rule[];
		setErrors(errors?: string[]): void;
	}
	export type RulesSpec = string|(string|Rule)[];
	const fieldContext = {};	//unique context key
	interface FieldContext {
		name: string;
		text: string;
}
	export function getField() { return getContext<Readable<FieldContext>>(fieldContext); }
</script>
<script lang="ts">
	import Input from "$svemantic/elements/input/Input.svelte";
    import i18n, { i18ned } from "$svemantic/i18n";
	import { clastr, semantic } from "$svemantic/root";
    import privateStore from "$svemantic/utils/privateStore";
    import { setContext, getContext, type ComponentProps } from "svelte";
    import type { Readable } from "svelte/store";
    import { getForm } from "./Form.svelte";

	function fieldDescr(identifier: string, optional: boolean, rules?: RulesSpec): FomanticField {
		const ruleList : Rule[] = rules ?
			(typeof rules === 'string' ? rules.split(',') : rules)
				.map(type=>typeof type === 'string' ? {type} : type) :
			[],
			hasEmptyRule = ruleList.some(r=> r.type === 'empty');
		return {
			identifier, optional,
			rules: optional || hasEmptyRule ? ruleList :
				[{type: 'empty'}, ...ruleList],
			setErrors
		};
	}
	function setErrors(errors?: string[]) {

	}
	const form = getForm();
	interface $$Props extends ComponentProps<Input> {
		name: string;
		label?: string;
		element?: string;
		inputClass?: string;
		required?: boolean;
		text?: string;
		validate?: RulesSpec;
	}
	
	export let element: string = form.tabular?'td': 'div', name: string, inputClass: string = '',
		required: boolean = false,
		validate: RulesSpec|undefined = undefined;
	let cs: string, specText: string|true = true, text: string, specLabel: string|true = '', label: string;
	export {specLabel as label, specText as text};
	$: label = i18ned(specLabel, $i18n.fld[name]);
	$: text = i18ned(specText, $i18n.fld[name]);
	const field = privateStore();
	setContext<Readable<FieldContext>>(fieldContext, field.store);
	$: field.value = {name, text};

	$: cs = clastr('field', $$props);
	form.addField(name, fieldDescr(name, !required, validate))
</script>
<svelte:element this={element} class={cs} use:semantic={$$props}>
	<slot name="label" {form}>
		{#if label}
			<label for={name}>{label}</label>
		{/if}
	</slot>
	<slot>
		<Input {...$$restProps} class={inputClass} />
	</slot>
</svelte:element>