<script lang="ts">
	import { semantic, uistr, type Forward } from "$svemantic/root";
    import { onDestroy } from "svelte";
    import module from "$svemantic/modules/bmodule";
    import AccordionPage from "./AccordionPage.svelte";
    import PageContainer from "./PageContainer.svelte";

	let node: HTMLDivElement;
	export let exclusive: boolean = true,
		collapsible: boolean = true;
	const accordion = module('accordion', {exclusive, collapsible});
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
	onDestroy(()=> accordion('destroy'));
	// TODO when not `exclusive`, `active` bindable like tabs
</script>
<div class={cs} use:accordion use:semantic={$$props} bind:this={node}>
	<PageContainer {spec}><slot /></PageContainer>
</div>