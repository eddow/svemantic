<script lang="ts">
	import { semantic, uistr, type Forward } from "$svemantic/root";
    import { onDestroy } from "svelte";
    import Module from "$svemantic/modules/Module";
    import AccordionPage from "./AccordionPage.svelte";
    import PageContainer from "./PageContainer.svelte";

	let node: HTMLDivElement;
	export let exclusive: boolean = true,
		collapsible: boolean = true;
	const module = Module('accordion', {exclusive, collapsible});
	interface $$Props extends Forward {
		styled?: boolean;
		exclusive?: boolean;
		collapsible?: boolean;
	}
	let cs: string;
	$: {
		let {styled} = $$props;
		cs = uistr('accordion', $$props, {styled});
	}
	const spec = {part: AccordionPage};
	onDestroy(()=> module('destroy'));
	// TODO Accordion usage <-> + test dynamic cases
</script>
<div class={cs} use:module use:semantic={$$props} bind:this={node}>
	<PageContainer {spec}><slot /></PageContainer>
</div>