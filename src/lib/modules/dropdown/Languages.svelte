<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Flag from '$svemantic/elements/Flag.svelte';
    import DropDown from "./Dropdown.svelte";
	import Menu from '$svemantic/elements/menu/Menu.svelte';

	const dispatch = createEventDispatcher();
	export let
		language: string,
		languages: Record<string, string|{flag: string, text: string}>;
	function change({detail: {value: lng}}: any) {
		dispatch('set-language', lng)
		language = lng;
	}
	let values: any[] = [];
	const flag = (key: string)=> (<any>languages[key]).flag || key;
	for(let key of Object.keys(languages))
		values.push({
			value: key,
			name: (<any>languages[key]).text || languages[key],
			icon: flag(key)
		});
</script>
<DropDown {...$$restProps} {values} items={Object.keys(languages)} className={{icon: 'flag'}} on:change={change}>
	<Flag slot="toggle" code={flag(language)} />
	<Menu vertical slot="menu" />
</DropDown>