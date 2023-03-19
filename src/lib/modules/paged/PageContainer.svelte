<script lang="ts" context="module">
    import { setContext, getContext } from "svelte";
    import type { PageSpecification } from "./Page.svelte";

	const pcContext = {};	//unique context key;
	export function getPageContainer<T extends PageSpecification = PageSpecification>() { return getContext<T>(pcContext); }
</script>
<script lang="ts">
	export let prefix: string = 'page-', spec: PageSpecification;
	let keys = 0;
	setContext(pcContext, Object.assign({KeyGen: ()=> prefix+(++keys)}, spec));
</script>
<slot />