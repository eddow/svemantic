<script lang="ts">
    import Cell, { type CellSettings } from "./Cell.svelte";
	interface $$Props extends CellSettings {}
</script>
<Cell element="td" {...$$props}><slot /></Cell>