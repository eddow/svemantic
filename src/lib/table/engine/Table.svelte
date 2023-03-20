<script lang="ts" context="module">
	type Stuckable = 'first' | 'last' | 'head' | 'foot';
    import { getContext, setContext } from "svelte";
	export interface ColumnContext extends Record<string, any> {
		name?: string|number|symbol;
		cellClass: Writable<string>;
	};
	const tableContext = {};
	export interface TableContext<T> {
		selected?: Writable<T|undefined>;
		column(key: number): ColumnContext;
	};
	export function getTable<T extends TableContext<any> = TableContext<any>>() {
		return getContext<T>(tableContext);
	}
</script>
<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
    import { childrenNumber, type ChildrenNumber } from '$svemantic/parts/Number';
    import { smallLarge, type SmallLarge } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";
    import { writable, type Writable } from "svelte/store";
    import MetaRow from './MetaRow.svelte';
    import Row from "./Row.svelte";
    import Switch from "./Switch.svelte";

	type T = $$Generic;
	const emptyRow = <T>{};
	interface $$Props extends Forward, SmallLarge, Color, ChildrenNumber {
		data: T[];
		definition?: boolean;
		structured?: boolean;
		singleLine?: boolean;
		fixed?: boolean;
		stackable?: boolean;
		selectable?: boolean;
		celled?: boolean;
		striped?: boolean;
		basic?: boolean|'very';
		collapsing?: boolean;
		sortable?: boolean;
		padded?: boolean;
		compact?: boolean|'very';
		scrolling?: boolean|'short'|'very short'|'long'|'very long';
		stuck?: Stuckable[]|Record<Stuckable, boolean>|string;
	}
	export let selectable: boolean = false, context: any = {}, data: T[],
		selected: T|undefined = undefined, selectedStore = selectable ? writable<T|undefined>(selected) : undefined;
	$: if(selectedStore) selectedStore.set(selected);
	if(selectedStore) selectedStore.subscribe(r=> { selected = r; })
	let columns: ColumnContext[] = [];
	setContext<TableContext<T>>(tableContext, Object.assign(Object.create(context), {
		selected: selectedStore,
		column: (key: number)=> columns[key]
	}));
	let cs: string;
	$: {
		let {
			definition, structured, singleLine, fixed, stackable, selectable, celled, striped, collapsing, padded,
			scrolling, basic, compact
		} = $$props;
		cs = uistr('table', $$props, [{
			definition, structured, fixed, stackable, selectable, celled, striped, collapsing, padded,
			scrolling, basic, compact
		}, singleLine && 'single line'], smallLarge, color, childrenNumber('column'));
	}
	/* TODO:
		tr/td: level positive|negative|error|warning|active|disabled|colored|right/center/top/bottom-aligned
		td: marked/selectable
		th: collapsing|`# wide`
		thead/tfoot: full-width
	 */
</script>
<table class={cs} use:semantic={$$props}>
	<MetaRow bind:columns><slot row={emptyRow} /></MetaRow>
	<thead>
		<Row part="title">
			{#each columns as column}
				<tr>{column.name}</tr>
			{/each}
		</Row>
	</thead>
	<tbody>
		{#each data as row}
			<Row part="data" data={row}>
				{#each columns as column, columnKey}
					<Switch {column} {columnKey} part="data" {row}>
						<slot />
					</Switch>
				{/each}
			</Row>
		{/each}
	</tbody>
</table>