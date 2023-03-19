<script lang="ts">
	import { Accordion, Tabs } from "$svemantic";
    import Pages from "./Pages.svelte";
	let active: any = 'p1';
</script>

<Accordion styled>
	<Pages />
</Accordion>

{active}

<Tabs tabs="bottom" bind:active>
	<Pages />
</Tabs>

<Pages />