<script lang="ts">
    import { onDestroy } from "svelte";
	export let node: HTMLDivElement | undefined;
	export let access: string;
	export let config: Record<string, any> = {};
	export let module: (...parms: any[])=> any = ()=> {};
	$: {	// call module when setting node => onMount ?
		let jqn = node && jQuery(node);
		if(jqn) {
			module = (<(...parms: any[])=> any>(<any>jqn)[access]).bind(jqn);
			/*let m = (<(...parms: any[])=> any>(<any>jqn)[access]).bind(jqn);
			module = (...parms: any[])=> {
				console.dir(parms);
				m(...parms);
			}*/
			module(config);
		}
	}
	onDestroy(()=> module('destroy'));
</script>
<slot />