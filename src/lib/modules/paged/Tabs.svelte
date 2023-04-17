<script lang="ts" context="module">
	const tabContext = {};	//unique context key;
	export function getTabs() { return getContext<Writable<string>>(tabContext); }
    import type { PageSpecification } from "./Page.svelte";
	export type TabSide = 'top' | 'bottom';
	export interface TabSpecification extends PageSpecification {
		side: TabSide;
		inverted: boolean;
	}
</script>
<script lang="ts">
    import { combine } from "$svemantic/root";
    import TabHeader from "./TabHeader.svelte";
	import TabContent from './TabContent.svelte';
    import { writable, type Writable } from "svelte/store";
    import { getContext, setContext } from "svelte";
    import PageContainer from "./PageContainer.svelte";

	export let tabs: TabSide = 'top', inverted: boolean = false, active: string = '',
		headerClass: string = '';
	const opposite: Record<TabSide, TabSide> = {top: 'bottom', bottom: 'top'},
		context = writable<string>(active);
	setContext<Writable<string>>(tabContext, context);
	$: context.set(active);
	context.subscribe(v=> { active = v; });
	let hdrSpec: TabSpecification, cntSpec: TabSpecification;
	$: {
		hdrSpec = {part: TabHeader, side: tabs, inverted};
		cntSpec = {part: TabContent, side: opposite[tabs], inverted};
	}
	let headersCls: string;
	$: headersCls = combine('ui', tabs, [headerClass, {inverted}], 'attached tabular menu');
</script>
{#if tabs === 'top'}
	<div class={headersCls}>
		<PageContainer spec={hdrSpec}><slot /></PageContainer>
	</div>
{/if}
<PageContainer spec={cntSpec}><slot /></PageContainer>
{#if tabs === 'bottom'}
	<div class={headersCls}>
		<PageContainer spec={hdrSpec}><slot /></PageContainer>
	</div>
{/if}