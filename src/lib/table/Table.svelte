<script lang="ts" context="module">
	type Stuckable = 'first' | 'last' | 'head' | 'foot';
</script>
<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
    import { childrenNumber, type ChildrenNumber } from '$svemantic/parts/Number';
    import { smallLarge, type SmallLarge } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";

	interface $$Props extends Forward, SmallLarge, Color, ChildrenNumber {
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
	let cs: string;
	$: {
		let {
			definition, structured, singleLine, fixed, stackable, selectable, celled, striped, collapsing, sortable, padded,
			scrolling, basic, compact
		} = $$props;
		cs = uistr('table', $$props, [{
			definition, structured, fixed, stackable, selectable, celled, striped, collapsing, sortable, padded,
			scrolling, basic, compact
		}, singleLine && 'single line'], smallLarge, color, childrenNumber('column'));
	}
	/* TODO:
		tr/td: level positive|negative|error|warning|active|disabled|colored|right/center/top/bottom-aligned
		td: marked/selectable
		th: collapsing|`# wide`|sorted-ascending/descending
		thead/tfoot: fuul-width
	 */
</script>
<table class={cs} use:semantic={$$props}>
	
</table>