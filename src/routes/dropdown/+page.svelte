<script lang="ts">
	/*
    import Accordion from "$svemantic/modules/accordion/Accordion.svelte";
    import Languages from "$svemantic/modules/dropdown/Languages.svelte";
	*/
    import { Languages, Select, Flag, SelectX } from "$svemantic";

	const options = [{value: 'M', text: 'Male'}, {value: 'F', text: 'Female'}], 
		languages = {fr: 'Français', en: {flag: 'gb uk', text: 'English'}, ro: 'Română', hu: 'Magyar'},
		flags: Record<string,string> = {en: 'gb uk'};
	let value: string = 'M', valueMult: string[], language = 'fr';
	// TODO multiple -> weird padding
</script>

<div>
	<Languages {languages} bind:language />
</div>
<div>
	<Flag huge code={flags[language] || language} />
</div>
<div>
	<Select {options} clearable bind:value placeholder="test-left" /> -: {value} :- <Select {options} bind:value />
</div>
<div>
	<SelectX useLabels={false} {options} clearable multiple bind:value={valueMult} placeholder="test-left" /> -: {valueMult} :- <SelectX {options} multiple bind:value={valueMult} />
</div>
