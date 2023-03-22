<script lang="ts">
    import Cell, { type CellSettings } from "./Cell.svelte";
	interface $$Props extends CellSettings {
		scope?: 'row'|'col';
	}
</script>
<Cell header {...$$props}><slot /></Cell>