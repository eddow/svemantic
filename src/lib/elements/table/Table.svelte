<script lang="ts" context="module">
	export type Stuckable = 'first' | 'last' | 'head' | 'foot';
</script>
<script lang="ts">
	import i18n from '$svemantic/i18n';
	import { color, type Color } from '$svemantic/parts/Color';
    import { childrenNumber, type ChildrenNumber } from '$svemantic/parts/Number';
    import { smallLarge, type SmallLarge } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";

	type T = $$Generic;
	const emptyRow = <T>{};
	interface $$Props extends Forward, SmallLarge, Color, ChildrenNumber {
		data?: T[];
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
	export let data: T[] = [];
	let cs: string;
	$: {
		let {
			definition, structured, singleLine, fixed, stackable, selectable, celled, striped, collapsing, padded,
			scrolling, basic, compact, stuck
		} = $$props;
		cs = uistr('table', $$props, [{
			definition, structured, fixed, stackable, selectable, celled, striped, collapsing, padded,
			scrolling, basic, compact, stuck
		}, singleLine && 'single line'], smallLarge, color, childrenNumber('column'));
	}
	/* TODO:
		tr/td: right/center/top/bottom-aligned
		td: marked/selectable
		thead/tfoot: full-width
	 */
</script>
<table class={cs} use:semantic={$$props}>
	<slot>
		<slot name="head" />
		<tbody>
			{#each data as row}
				<slot name="data" {row} />
			{:else}
				<tr><td colspan=100>{$i18n.table.empty}</td></tr>
			{/each}
		</tbody>
		<slot name="foot" />
	</slot>
</table>