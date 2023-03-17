import { writable } from "svelte/store"

const englishDefault = {
	or: 'or',
	dropdown: {
		addResult: 'Add <b>{term}</b>',
		count: '{count} selected',
		maxSelections : 'Max {maxCount} selections',
		noResults: 'No results found.'
	},
	pppControl: {
		ok: 'Ok',
		cancel: 'Cancel',
		close: 'Close'
	}
}
export default writable<typeof englishDefault>(englishDefault);
// jQuery.fn.dropdown.settings.message