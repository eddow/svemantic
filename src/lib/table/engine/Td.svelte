<script lang="ts">
    import Cell from "./Cell.svelte";
	import type { CellSettings } from "./Cell.svelte";

	interface $$Props extends CellSettings {}
</script>
<Cell element="td" {...$$props}><slot /></Cell>