<script lang="ts">
	import { browser } from '$app/environment';
    import { onDestroy } from "svelte";
	export let node: HTMLElement | undefined;
	export let access: string;
	export let config: Record<string, any> = {};
	export let module: (...parms: any[])=> any = ()=> {};
	$: {
		if(browser) {
			let jqn = node && jQuery(node);
			if(jqn) {
				module = (<(...parms: any[])=> any>(<any>jqn)[access]).bind(jqn);
				module(config);
			}
		}
	}
	onDestroy(()=> module('destroy'));
</script>
<slot />