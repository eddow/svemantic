<script lang="ts" context="module">
	const tabContext = {};	//unique context key;
	export function getTabs() { return getContext<Writable<string>>(tabContext); }
</script>
<script lang="ts">
    import { combine } from "$lib/root";
    import TabHeader from "./TabHeader.svelte";
	import TabContent from './TabContent.svelte';
    import { writable, type Writable } from "svelte/store";
    import { getContext, setContext } from "svelte";
    import PageContainer from "./PageContainer.svelte";

	export let tabs: SveMantic.TabSide = 'top', inverted: boolean = false, active: string = '',
		headerClass: string = '';
	const opposite: Record<SveMantic.TabSide, SveMantic.TabSide> = {top: 'bottom', bottom: 'top'},
		context = writable<string>(active);
	setContext<Writable<string>>(tabContext, context);
	$: context.set(active);
	context.subscribe(v=> { active = v; });
	let hdrSpec: SveMantic.TabSpecification, cntSpec: SveMantic.TabSpecification;
	$: {
		hdrSpec = {part: TabHeader, side: tabs, inverted};
		cntSpec = {part: TabContent, side: opposite[tabs], inverted};
	}
	let headersCls: string;
	$: headersCls = combine('ui', tabs, [headerClass, {inverted}], 'attached tabular menu');
</script>
{#if tabs === 'top'}
	<div class={headersCls}>
		<PageContainer><slot spec={hdrSpec} /></PageContainer>
	</div>
{/if}
<PageContainer><slot spec={cntSpec} /></PageContainer>
{#if tabs === 'bottom'}
	<div class={headersCls}>
		<PageContainer><slot spec={hdrSpec} /></PageContainer>
	</div>
{/if}