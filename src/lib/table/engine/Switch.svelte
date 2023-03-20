<script lang="ts" context="module">
    import Select from "./Select.svelte";
    import { getContext, setContext } from "svelte";
    import type { ColumnContext } from "./Table.svelte";
	const switchContext = {};
	export interface SwitchContext {
		columnKey?: number;
		genCaseKey(): number;
	}
	export function getSwitch<T>() {
		return getContext<SwitchContext & T>(switchContext);
	}
	export function setSwitch<T=any>(columnKey: number, remaining: T) {
		let gndCases: number = 0;

		setContext<T & SwitchContext>(switchContext, {
			columnKey,
			genCaseKey: ()=> gndCases++,
			...remaining			
		});
	}
	export interface Match {
		key: number;
		match: string[];
	}
	const columnContext = {};
	export function getColumn<T extends ColumnContext = ColumnContext>() {
		return getContext<T>(columnContext);
	}
</script>
<script lang="ts">
    import Case from "./Case.svelte";

	type T = $$Generic;

	export let columnKey: number, column: ColumnContext, part: string, row: T;
	let matches: Match[];
	setContext<ColumnContext>(columnContext, column);
	let caseKey: number|undefined = undefined;
	$: caseKey = matches[0].key;
</script>
<Select {columnKey} bind:match >
	<slot />
</Select>
{#if caseKey === undefined}
	<td></td>
{:else}
	<Case {columnKey} {caseKey}>
		<slot />
	</Case>
{/if}