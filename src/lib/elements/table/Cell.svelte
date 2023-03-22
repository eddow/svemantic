<script lang="ts" context="module">
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
		header?: boolean;
		scope?: 'row'|'col';
	}
	export let header: boolean = false, scope: 'row'|'col'|undefined = $$props.scope,
		rowspan: number|undefined = undefined, colspan: number|undefined = undefined,
		collapsing: boolean = false;
	let cs: string, scopeArg: any;
	$: cs = frwstr($$props, {collapsing}, contentColor, childrenNumber('wide'));
	$: scopeArg = header && scope ? {scope} : {};
</script>
<svelte:element this={header?'th':'td'} {...scopeArg} {rowspan} {colspan} class={cs}>
	<slot />
</svelte:element>