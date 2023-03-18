<script lang="ts">
	import { Page, Accordion, Tabs } from "$lib";
    import Pages from "./Pages.svelte";
	let active: any = 'p1';
</script>

<Accordion styled let:spec>
	<Pages {spec} />
</Accordion>

{active}

<Tabs tabs="bottom" let:spec bind:active>
	<Pages {spec} />
</Tabs>