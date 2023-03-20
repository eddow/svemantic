<script lang="ts" context="module">
	export interface MetaRowContext<T=any> extends RowContext<T> {
		addColumn(ctx: ColumnContext): void;
	}
</script>
<script lang="ts">
    import type { RowContext } from "./Row.svelte";
    import type { ColumnContext } from "./Table.svelte";
    import Row from "./Row.svelte";

	type T = $$Generic;
	export const columns: ColumnContext[] = [];

	const context: any = {
		addColumn(ctx: ColumnContext) {
			console.assert(!ctx.name || !columns.some(c=> c.name === ctx.name), `Column declared twice : ${String(ctx.name)}`);
			columns.push(ctx);
		}
	};
</script>
<Row {context}>
	<slot />
</Row>
