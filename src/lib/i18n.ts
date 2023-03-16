import { writable } from "svelte/store"

const englishDefault = {
	or: 'or',
	dropdown: {
		addResult     : 'Add <b>{term}</b>',
		count         : '{count} selected',
		maxSelections : 'Max {maxCount} selections',
		noResults     : 'No results found.'
	}
}
export default writable<typeof englishDefault>(englishDefault);
// $.fn.dropdown.settings.message