<script lang="ts">
	/*
    import Accordion from "$lib/modules/accordion/Accordion.svelte";
    import Languages from "$lib/modules/dropdown/Languages.svelte";
	*/
    import Flag from "$lib/elements/Flag.svelte";
    import Icon from "$lib/elements/Icon.svelte";
    import Loader from "$lib/elements/Loader.svelte";
    import Select from "$lib/modules/dropdown/Select.svelte";

	let values = [{value: 'M', name: 'Male'}, {value: 'F', name: 'Female'}], value: string = 'M';
	//let languages = {fr: 'Français', en: {flag: 'gb uk', text: 'English'}, ro: 'Romanian'}, language = 'fr';
</script>

<Select {values} bind:value placeholder="test-left" /><br />
{value}<br />
<!--Select items={values} bind:value placeholder="blup">
	<div slot="item" let:item class="item" data-value={item && item.value}>
		<Icon icon={item && item.name.toLowerCase()} />
		{item && item.name}
	</div>
</Select><br /-->
<Select {values} bind:value />
<div>
	<Flag huge code="fr" />
</div>
<div>
	<Icon huge icon={['big red dont', 'black user']} />
</div>
<div class="ui segment">
	<Loader inverted loading />
	<p>gsdfgs dfdfhb dfhfdfjn fg gf ghf</p>
	<p>gsdfgs dfdfhb dfhfdfjn fg gf ghf</p>
</div>