<script lang="ts" context="module">
    import { getContext, setContext } from "svelte";
	const itemsContext = {};
	export interface ItemActivation {
		(active: boolean): void | false;
	}
	export interface ItemsRoot<T> {
		register(key: T, act: ItemActivation): void;
		remove(key: T): void;
		activate(key: T, active: boolean): boolean;
	};
	export function getRoot<T=any>() {
		return getContext<ItemsRoot<T>>(itemsContext);
	}
</script>
<script lang="ts">
	type T = $$Generic;
	const items = new Map<T, ItemActivation>();
	//? TODO allows export of `activeKey` and bind: manage prvAK
	let activeKey: T | undefined = undefined, prvAK: T | undefined = undefined;
	function deactivate(): boolean {
		if(activeKey === undefined) return true;
		console.assert(items.has(activeKey), `Key not found: ${activeKey}`);
		return !items.has(activeKey) || items.get(activeKey)!(false) !== false ?
			(activeKey = undefined, true) :
			false;
	}
	function activate(key: T|undefined, active: boolean) {
		if(!active) 
			return key === prvAK ? deactivate() : true;
		if(prvAK === key) return (prvAK = activeKey = key) && true;
		console.assert(key !== undefined && items.has(key), `Key not found: ${key}`);
		return deactivate() && (key === undefined || (items.has(key) && items.get(key)!(true))) && (prvAK = activeKey = key);
	}
	$: if(activeKey !== prvAK && !activate(activeKey, true))
		activeKey = prvAK;
	setContext(itemsContext, <ItemsRoot<T>>{
		register(key: T, act: ItemActivation) {
			console.assert(!items.has(key), `Duplicate key: ${key}`);
			items.set(key, act);
		},
		remove(key: T) {
			console.assert(items.has(key), `Key not found: ${key}`);
			if(activeKey === key) deactivate();
			items.delete(key);
		},
		activate
	})
</script>
<slot />