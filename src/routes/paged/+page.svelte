<script lang="ts">
	import { Page, Accordion, Tabs } from "$lib";
    import Pages from "./Pages.svelte";
</script>

<Accordion styled let:spec>
	<Pages {spec} />
</Accordion>

<Tabs let:spec>
	<Pages {spec} />
</Tabs>