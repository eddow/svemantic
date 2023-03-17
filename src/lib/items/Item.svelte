<script lang="ts">
    import { createEventDispatcher, onDestroy } from "svelte";
    import { getRoot } from "./Items.svelte";

	export let key: any = {}, active: boolean = false;
	let oldKey: any = undefined, oldActive: boolean = false;
	const root = getRoot();
	console.assert(!!root, `Item ${key} in an item container`)
	function activate(nactive: boolean) {
		if(oldActive !== nactive && !dispatch('activate', nactive, {cancelable: true}))
			return false;
		oldActive = active = nactive;
	}
	$: {
		if(oldKey !== undefined)
			root.remove(oldKey);
		if(oldKey !== key)
			root.register(key, activate)
	}

	const dispatch = createEventDispatcher();
	$: if(oldActive !== active) {
		if(root && !root.activate(key, active))
			active = oldActive;
		else dispatch('activated', oldActive = active);
	}

	onDestroy(()=> root.remove(key));
</script>
<slot />