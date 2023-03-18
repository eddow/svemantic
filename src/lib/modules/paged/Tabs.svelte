<script lang="ts">
    import { combine } from "$lib/root";
    import TabHeader from "./TabHeader.svelte";
	import TabContent from './TabContent.svelte';

	type Position = 'top' | 'bottom';
	export let tabs: Position = 'top', inverted: boolean = false;
	const opposite: Record<Position, Position> = {top: 'bottom', bottom: 'top'};
	console.log(TabHeader.name);
	let hdrSpec: Paged.TabSpecification, cntSpec: Paged.TabSpecification;
	$: {
		hdrSpec = {part: TabHeader, side: tabs, inverted};
		cntSpec = {part: TabContent, side: opposite[tabs], inverted};
	}
	let headersCls: string;
	$: headersCls = combine('ui', tabs, {inverted}, 'attached tabular menu');
	// TODO => use ui menu w/ tabular
	// TODO keys generation
</script>

<div class={headersCls}>
	<slot spec={hdrSpec} />
</div>
<slot spec={cntSpec} />