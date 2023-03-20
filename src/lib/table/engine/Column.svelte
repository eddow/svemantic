<script lang="ts" context="module">
	export type DataType = 'text'|'email'|'number'|'range'|'tel'|'url'|'time'|'date'|'month'|'week'|'datetime-local'|'color'|'file'|'area'|'complex';

	const inColumnContext = {};
	export function inColumn() {
		return getContext<boolean>(inColumnContext);
	}
</script>
<script lang="ts">
    import { childrenNumber, type ChildrenNumber } from "$svemantic/parts/Number";
    import { frwstr } from "$svemantic/root";

    import { setContext, getContext } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import type { MetaRowContext } from "./MetaRow.svelte";
    import { getRow } from "./Row.svelte";
    import { getSwitch } from "./Switch.svelte";

	type T = $$Generic;

	interface $$Props extends ChildrenNumber {
		name?: keyof T;
		collapsing?: boolean;
	}
	export let collapsing: boolean = false, name: keyof T|undefined = undefined;
	const cellClass = writable<string>();
	$: cellClass.set(frwstr($$props, {collapsing}, childrenNumber('wide')));
	const row = <MetaRowContext>getRow(), key = row.genColumnKey(), swtch = getSwitch();
	if(row.addColumn)
		row.addColumn({name, cellClass, ...$$restProps});
	else if(swtch?.columnKey === key)
		setContext(inColumnContext, true);
</script>
{#if swtch?.columnKey === key}
	<slot />
{/if}
