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
		setErrors?(errors?: string[]): void;
	}
	export type RulesSpec = string|(string|Rule)[];
	
	export type FieldContext = Readable<{name: string, text: string}>;

	const fieldContext = {};	// unique context key
	export function getField(): FieldContext {
		return getContext<FieldContext>(fieldContext);
	}
</script>
<script lang="ts">
	import { field } from "$svemantic/i18n";

	import { clastr, semantic } from "$svemantic/root";
    import { getContext, setContext } from "svelte";
	import type { Readable } from "svelte/store";
    import { getForm } from '$svemantic/modules/form/FormModule';
    import Popup from '$svemantic/modules/popup/Popup.svelte';
    import { createEventDispatcher, onDestroy } from 'svelte';
    import privateStore from "$svemantic/utils/privateStore";

	function fieldDescr(identifier: string, optional: boolean, rules?: RulesSpec): FomanticField {
		const ruleList : Rule[] = rules ?
			(typeof rules === 'string' ? rules.split('&') : rules)
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
	function setErrors(nwErrors?: string[]) {	// TODO? Put errors in context
		errors = nwErrors;
		dispatch('validated', errors);
	}

	const dispatch = createEventDispatcher(), form = getForm();
	export let
		rawContext: Record<string, any> = Object.prototype,
		required: boolean = false,
		name: string = '',
		label: string|boolean = false,
		validate: RulesSpec|undefined = undefined;
		
	let cs: string,
		text: string = '...',
		errors: string[]|undefined = undefined;
	$: cs = clastr('field', $$props);
	const context = privateStore(Object.create(rawContext));
	$: context.value = Object.assign(Object.create(rawContext), {name, text: text=$field(name)});

	setContext<FieldContext>(fieldContext, context.store);

	if(name && form) {
		form.addField(name, fieldDescr(name, !required, validate));
		onDestroy(()=> { form.removeField(name!); });
	}
</script>
	<div class={cs} use:semantic={$$props}>
		{#if label}
			<slot name="label">
				<label for={name}>{label === true ? text : label}</label>
			</slot>
		{/if}
		<slot {errors} />
	</div>
{#if form?.errorDisplay === 'popup' && errors}
	<Popup inverted color="red">
		<div class="ui list">
			{#each errors as error}
				<div class="item">{error}</div>
			{/each}
		</div>
	</Popup>
{/if}