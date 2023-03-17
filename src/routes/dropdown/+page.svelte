<script lang="ts">
	/*
    import Accordion from "$lib/modules/accordion/Accordion.svelte";
    import Languages from "$lib/modules/dropdown/Languages.svelte";
	*/
    import { Languages, Select, Flag } from "$lib";

	const values = [{value: 'M', name: 'Male'}, {value: 'F', name: 'Female'}], 
		languages = {fr: 'Français', en: {flag: 'gb uk', text: 'English'}, ro: 'Română', hu: 'Magyar'},
		flags: Record<string,string> = {en: 'gb uk'};
	let value: string = 'M', valueMult: string, language = 'fr';
	// TODO multiple -> weird padding
</script>

<div>
	<Languages {languages} bind:language />
</div>
<div>
	<Flag huge code={flags[language] || language} />
</div>
<div>
	<Select {values} clearable bind:value placeholder="test-left" /> -: {value} :- <Select {values} bind:value />
</div>
<div>
	<Select {values} clearable multiple bind:value={valueMult} placeholder="test-left" /> -: {valueMult} :- <Select {values} multiple bind:value={valueMult} />
</div>
