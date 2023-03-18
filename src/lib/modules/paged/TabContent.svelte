<script lang="ts">
	import { combine } from "$lib/root";

	export let spec: Paged.TabSpecification, key: string;
	let cs: string;
	$: cs = combine('ui', spec.side, 'attached', {inverted: spec.inverted}, 'tab segment');
</script>
<div class={cs} data-tab={key}><slot /></div>