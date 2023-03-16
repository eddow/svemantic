<script lang="ts">
	/*
    import Accordion from "$lib/modules/accordion/Accordion.svelte";
    import Languages from "$lib/modules/dropdown/Languages.svelte";
	*/
	import Button from "$lib/elements/button/Button.svelte";
	import Buttons from "$lib/elements/button/Buttons.svelte";
    import Flag from "$lib/elements/Flag.svelte";
    import Icon from "$lib/elements/Icon.svelte";
    import Loader from "$lib/elements/Loader.svelte";
    import Select from "$lib/modules/dropdown/Select.svelte";

	let values = [{value: 'M', name: 'Male'}, {value: 'F', name: 'Female'}], value: string = 'M';
	//let languages = {fr: 'Français', en: {flag: 'gb uk', text: 'English'}, ro: 'Romanian'}, language = 'fr';
</script>

<Select {values} bind:value placeholder="test-left" /><br />
{value}<br />
<Select {values} bind:value placeholder="blup" /><br />
<!--Select {values} bind:value /-->
<button class="ui fast loading button">Loading</button>
<div>
	<Flag huge code="fr" />
</div>
<div>
	<Buttons attached="top">
		<Button>bs A</Button>
		<Button loading="fast double">bs B</Button>
		<Button>bs C</Button>
	</Buttons>
	
	<Button circular>circular</Button>
</div>
<div>
	<Icon huge icon={['big red dont', 'black user']} />
</div>
<div class="ui segment">
	<Loader inverted loading />
	<p>gsdfgs dfdfhb dfhfdfjn fg gf ghf</p>
	<p>gsdfgs dfdfhb dfhfdfjn fg gf ghf</p>
</div>