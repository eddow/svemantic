<script lang="ts">
    import Cell, { type CellSettings } from "./Cell.svelte";
	interface $$Props extends CellSettings {}
</script>
<Cell {...$$props}><slot /></Cell>