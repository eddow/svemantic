<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Flag from '$svemantic/elements/Flag.svelte';
    import DropDown, { type DropdownOption } from "./Dropdown.svelte";

	function change({detail: {value: lng}}: any) {
		dispatch('set-language', lng)
		language = lng;
	}
	export let
		language: string,
		languages: Record<string, string|{flag: string, text: string}>;
	const
		dispatch = createEventDispatcher(),
		flag = (key: string)=> (<any>languages[key]).flag || key,
		options: DropdownOption[] = Object.keys(languages).map(key=> ({
			value: key,
			text: (<any>languages[key]).text || languages[key],
			icon: flag(key)
		}));
</script>
<DropDown {...$$restProps} {options} className={{icon: 'flag'}} on:change={change}>
	<Flag slot="toggle" code={flag(language)} />
</DropDown>