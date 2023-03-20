<script lang="ts">
    import Cell from "./Cell.svelte";
	import type { CellSettings } from "./Cell.svelte";

	interface $$Props extends CellSettings {
		scope?: 'row'|'col';
	}
</script>
<Cell element="th" {...$$props}><slot /></Cell>