<script lang="ts">
    import Column from "./engine/Column.svelte";
    import { getRow } from "./engine/Row.svelte";
    import Th from "./engine/Th.svelte";

	type T = $$Generic;

	export let selection = new Set<T>();
	const {data} = getRow(), state = {
		get selected() { return selection.has($data); },
		set selected(v: boolean) {
			if(v !== this.selected) {
				console.log($data);
				if(v) selection.add($data);
				else selection.delete($data);
				selection = selection;
			}
		}
	};
	
</script>
<Column collapsing>
	<Th part="title" scope="col">
		<div class="ui checkbox">
			<input type="checkbox" bind:checked={state.selected} />
		</div>
	</Th>
	<Th part="data" scope="row">
		<input type="checkbox" bind:checked={state.selected} />
	</Th>
</Column>
