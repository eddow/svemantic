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
	import { writable, type Readable } from "svelte/store";
    import { getForm } from '$svemantic/modules/form/FormModule';
    import Popup from '$svemantic/modules/popup/Popup.svelte';
    import { createEventDispatcher, onDestroy } from 'svelte';

/*
	interface $$Props {
		name?: string = ''
		label?: string|boolean
	//#region Semantic validation
		required?: boolean
		email?: boolean
		url?: boolean
		integer?: boolean|[number, number]
		decimal?: boolean|[number, number]
		number?: boolean|[number, number]
		min?: number
		max?: number
		regexp?: string|RegExp
		'credit-card'?: true|'visa'|'mastercard'|'unionpay'

		contains?: string
		'contains-exactly'?: string
		'doesnt-contains'?: string
		'doesnt-contains-exactly'?: string
		is?: string
		'is-exactly'?: string
		not?: string
		'not-exactly'?: string

		length?: number|[number, number]
		'min-length'?: number
		'max-length'?: number
		
		match?: string
		different?: string

		count?: number
		'min-count'?: number
		'max-count'?: number
	}
	$: {
		const {
			required: empty, email, url, integer, decimal, number, min: minValue, max: maxValue, regexp, 'credit-card': creditCard,
			conbtains, 'contains-exactly': containsExactly, 'doesnt-contains': doesntContains, 'doesnt-contains-exactly': doesntContainsExactly,
			is, 'is-exactly': isExactly, not, 'not-exactly': notExactly,
			length, 'min-length': minLength, 'max-length': maxLength, match, different,
			count, 'min-count': minCount, 'max-count': maxCount
		} = $$props;
		const {exactLength, size} : {exactLength?: number, size?: [number, number]} =
			typeof length === 'number' ? {exactLength: length} : {size: length};
		const ruleDescs = {
			empty, email, url, integer, decimal, number, minValue, maxValue, regexp, creditCard,
			conbtains, containsExactly, doesntContains, doesntContainsExactly,
			is, isExactly, not, notExactly,
			exactLength, size, minLength, maxLength, match, different,
			count, minCount, maxCount};
		type ruleType = keyof typeof ruleDescs;
		const ruleSet: Rule[] = (<ruleType[]>Object.keys(ruleDescs)).filter(k=> ruleDescs[k] !== undefined)
			.map((type: ruleType)=> {
				const desc: any = ruleDescs[type], args =
					desc === true ? {} :
					['string', 'number'].includes(typeof desc) ? {value: desc} :
					desc instanceof Array ? {value: (([x, y])=> `${x}..${y}`)(desc)} :
					{};	//error
				return { type, ...args };
			});
	};*/
	//#endregion

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
	function setErrors(nwErrors?: string[]) {	// TODO? Errors in context
		errors = nwErrors;
		dispatch('validated', errors);
	}

	const dispatch = createEventDispatcher(), form = getForm();
	export let
		required: boolean = false,
		name: string = '',
		label: string|boolean = false,
		validate: RulesSpec|undefined = undefined;
		
	let cs: string,
		text: string = '...',
		errors: string[]|undefined = undefined;
	$: {
		text = $field(name);
		context.set({ name, text });
	}
	$: cs = clastr('field', $$props);

	const context = writable({ name, text });
	setContext<FieldContext>(fieldContext, context);

	if(name && form) {
		form.addField(name, fieldDescr(name, !required, validate));
		onDestroy(()=> { form.removeField(name!); });
	}
</script>
{#if label}
	<div class={cs} use:semantic={$$props}>
		<slot name="label">
			<label for={name}>{label === true ? text : label}</label>
		</slot>
		<slot {errors} />
	</div>
{:else}
	<slot {errors} />
{/if}
{#if form?.errorDisplay === 'popup' && errors}
	<Popup inverted color="red">
		<div class="ui list">
			{#each errors as error}
				<div class="item">{error}</div>
			{/each}
		</div>
	</Popup>
{/if}