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
	export function formInputAttr(props: any) {
		const {required, validate, name} = props;
		return {required, validate, name};
	}
</script>
<script lang="ts">
    import { getForm } from '$svemantic/modules/form/FormModule';
    import Popup from '$svemantic/modules/popup/Popup.svelte';
    import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher(), form = getForm(), tabular = !!form && form.tabular;
	export let required: boolean = false, validate: RulesSpec|undefined = undefined, name: string|undefined = undefined;
	
	let errors: string[]|undefined = undefined;
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
	function setErrors(nwErrors?: string[]) {
		errors = nwErrors;
		dispatch('validated', errors);
	}
	if(name && form) {
		form.addField(name, fieldDescr(name, !required, validate));
		onDestroy(()=> { form.removeField(name!); });
	}
</script>
<slot {errors} />
{#if form?.errorDisplay === 'popup' && errors}
	<Popup inverted color="red">
		<div class="ui list">
			{#each errors as error}
				<div class="item">{error}</div>
			{/each}
		</div>
	</Popup>
{/if}