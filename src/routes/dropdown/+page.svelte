<script lang="ts">
	/*
    import Accordion from "$lib/modules/accordion/Accordion.svelte";
    import Languages from "$lib/modules/dropdown/Languages.svelte";
	*/
    import { Languages, Select, Flag } from "$lib";

	let values = [{value: 'M', name: 'Male'}, {value: 'F', name: 'Female'}], value: string = 'M';
	let languages = {fr: 'Français', en: {flag: 'gb uk', text: 'English'}, ro: 'Romanian'}, language = 'fr';
</script>

<div>
	<Languages {languages} {language} />
</div>
<div>
<Select {values} multiple bind:value placeholder="test-left" /><br />
{value}<br />
<!--Select items={values} bind:value placeholder="blup">
	<div slot="item" let:item class="item" data-value={item && item.value}>
		<Icon icon={item && item.name.toLowerCase()} />
		{item && item.name}
	</div>
</Select><br /-->
<Select {values} multiple bind:value />
</div>
<div>
	<Flag huge code="fr" />
</div>
