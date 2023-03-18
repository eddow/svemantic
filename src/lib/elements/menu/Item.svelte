<script lang="ts">
    import { createEventDispatcher, onDestroy } from "svelte";
    import { getRoot } from "./Items.svelte";

	export let key: any = {}, active: boolean = false;
	let prvKey: any = undefined, prvActive: boolean = false;
	const root = getRoot();
	console.assert(!!root, `Item ${key} in an item container`)
	function activate(nactive: boolean) {
		if(prvActive !== nactive && !dispatch(nactive?'activate':'deactivate', null, {cancelable: true}))
			return false;
		prvActive = active = nactive;
	}
	$: {
		if(prvKey !== undefined)
			root.remove(prvKey);
		if(prvKey !== key) {
			if(key !== undefined) root.register(key, activate);
			prvKey = key;
		}
	}

	const dispatch = createEventDispatcher();
	$: if(prvActive !== active) {
		if(root && !root.activate(prvKey, active))
			active = prvActive;
		else dispatch((prvActive = active) ? 'activated' : 'deactivated');
	}

	onDestroy(()=> root.remove(key));
</script>
<slot active={prvActive} />