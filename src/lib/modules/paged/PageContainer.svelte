<script lang="ts" context="module">
    import { setContext, getContext } from "svelte";

	const pcContext = {};	//unique context key;
	type KeyGen = ()=> string;
	export function getPageContainer() { return getContext<KeyGen>(pcContext); }
</script>
<script lang="ts">
	export let prefix: string = 'page-';
	let keys = 0;
	setContext(pcContext, ()=> prefix+(++keys));
</script>
<slot />