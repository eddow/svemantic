<script lang="ts" context="module">
	export type CellElement = 'td' | 'th';
	export interface CellSettings extends Forward, ContentColor, ChildrenNumber {
		rowspan?: number;
		colspan?: number;
		collapsing?: boolean;
	}
</script>
<script lang="ts">
	import { frwstr, type Forward } from "$svemantic/root";
    import { contentColor, type ContentColor } from './ContentColor';
    import { childrenNumber, type ChildrenNumber } from "$svemantic/parts/Number";
	
	interface $$Props extends CellSettings {
		element: CellElement;
	}
	export let element: CellElement, scope: 'row'|'col'|undefined = $$props.scope,
		rowspan: number|undefined = undefined, colspan: number|undefined = undefined,
		collapsing: boolean = false;
	let cs: string;
	$: cs = frwstr($$props, {collapsing}, contentColor, childrenNumber('wide'));
</script>
<svelte:element this={element} {scope} {rowspan} {colspan} class={cs}>
	<slot />
</svelte:element>