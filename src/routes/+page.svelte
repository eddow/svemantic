<script lang="ts">
	/*
    import Accordion from "$svemantic/modules/accordion/Accordion.svelte";
    import Languages from "$svemantic/modules/dropdown/Languages.svelte";
	*/
    import Flag from "$svemantic/elements/Flag.svelte";
    import Icon from "$svemantic/elements/Icon.svelte";
    import Loader from "$svemantic/elements/Loader.svelte";
    import type { DropdownOption } from "$svemantic/modules/dropdown/Dropdown.svelte";
    import Select from "$svemantic/modules/dropdown/Select.svelte";

	let options: DropdownOption[] = [{value: 'M', text: 'Male', display: 'Mm'}, {value: 'F', text: 'Female', display: 'Ff'}], value: string = 'M';
	//let languages = {fr: 'Français', en: {flag: 'gb uk', text: 'English'}, ro: 'Romanian'}, language = 'fr';
</script>

<Select {options} bind:value placeholder="test-left" /><br />
{value}<br />
<!--Select items={values} bind:value placeholder="blup">
	<div slot="item" let:item class="item" data-value={item && item.value}>
		<Icon icon={item && item.name.toLowerCase()} />
		{item && item.name}
	</div>
</Select><br /-->
<Select {options} bind:value />
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