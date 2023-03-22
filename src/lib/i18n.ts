import { onDestroy } from "svelte";
import { writable } from "svelte/store"

const englishDefault = {
	or: 'or',
	dropdown: {
		addResult: 'Add <b>{term}</b>',
		count: '{count} selected',
		maxSelections : 'Max {maxCount} selections',
		noResults: 'No results found.'
	},
	table: {
		empty: 'No data to show'
	},
	form: {
		text: {
			and: 'and',
			unspecifiedRule: 'Please enter a valid value',
			unspecifiedField: 'This field',
			leavingMessage: 'There are unsaved changes on this page which will be discarded if you continue.',
		},
		prompt: {
			range: '{name} must be in a range from {min} to {max}',
			maxValue: '{name} must have a maximum value of {ruleValue}',
			minValue: '{name} must have a minimum value of {ruleValue}',
			empty: '{name} must have a value',
			checked: '{name} must be checked',
			email: '{name} must be a valid e-mail',
			url: '{name} must be a valid url',
			regExp: '{name} is not formatted correctly',
			integer: '{name} must be an integer',
			decimal: '{name} must be a decimal number',
			number: '{name} must be set to a number',
			is: '{name} must be "{ruleValue}"',
			isExactly: '{name} must be exactly "{ruleValue}"',
			not: '{name} cannot be set to "{ruleValue}"',
			notExactly: '{name} cannot be set to exactly "{ruleValue}"',
			contain: '{name} must contain "{ruleValue}"',
			containExactly: '{name} must contain exactly "{ruleValue}"',
			doesntContain: '{name} cannot contain "{ruleValue}"',
			doesntContainExactly: '{name} cannot contain exactly "{ruleValue}"',
			minLength: '{name} must be at least {ruleValue} characters',
			exactLength: '{name} must be exactly {ruleValue} characters',
			maxLength: '{name} cannot be longer than {ruleValue} characters',
			size: '{name} must have a length between {min} and {max} characters',
			match: '{name} must match {ruleValue} field',
			different: '{name} must have a different value than {ruleValue} field',
			creditCard: '{name} must be a valid credit card number',
			minCount: '{name} must have at least {ruleValue} choices',
			exactCount: '{name} must have exactly {ruleValue} choices',
			maxCount: '{name} must have {ruleValue} or less choices',
			addErrors: '{name}: {error}',
		}
	},
	cmd: {
		ok: 'Ok',
		cancel: 'Cancel',
		close: 'Close'
	},
	fld: <Record<string, string>>{}
}
const i18n = writable<typeof englishDefault>(englishDefault);
export default i18n;

export function field(name: string|undefined, text: string|boolean, cb: (v: string)=> void, dft?: string) {
	console.assert(name || text !== true, 'Cannot determine text of field without name');
	if(name && text === true)
		onDestroy(i18n.subscribe(v=> cb(v.fld[name] || dft || `[fld.${name}]`)));
}