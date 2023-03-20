<script lang="ts" context="module">
	export type CellElement = 'td' | 'th';
	export interface CellSettings extends Forward, ContentColor {
		part?: string;
		rowspan?: number;
		colspan?: number;
	}
</script>
<script lang="ts">
	import { frwstr, type Forward } from "$svemantic/root";
    import { inColumn } from "./Column.svelte";
    import { contentColor, type ContentColor } from '../ContentColor';
    import { getRow } from "./Row.svelte";
    import { getColumn, getSwitch } from "./Switch.svelte";
    import type { SelectContext } from "./Select.svelte";

	interface $$Props extends CellSettings {
		element: CellElement;
	}
	export let part: string|undefined = undefined, element: CellElement,
		rowspan: number|undefined = undefined, colspan: number|undefined = undefined;
	const scope: 'row'|'col'|undefined = $$props.scope;
	
	const row = getRow(),
		col = getColumn(),
		swtch = getSwitch<SelectContext>(),
		caseKey = swtch.genCaseKey();

	let cs: string, displayed: boolean = false;
	const cellClass = col && col.cellClass;
	if(swtch.addCase && part === row.part) {
		const matches: string[] = inColumn() ? ['column'] : [];
		swtch.addCase(caseKey, matches);
	}
	$: if(displayed) cs = frwstr($$props, $cellClass, contentColor);
</script>
{#if displayed}
	<svelte:element this={element} {scope} {rowspan} {colspan} class={cs}>
		<slot />
	</svelte:element>
{/if}