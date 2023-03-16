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
	export function getRoot<T=any>(itemContainer: boolean = false) {
		const rv = getContext<ItemsRoot<T>>(itemsContext);
		if(!itemContainer) setContext(itemsContext, undefined);
		return rv;
	}
</script>
<script lang="ts">
	type T = $$Generic;
	const items = new Map<T, ItemActivation>;
	//? TODO allows export of àctiveKey and bind
	let activeKey: T | undefined = undefined;
	function deactivate(): boolean {
		if(activeKey === undefined) return true;
		console.assert(items.has(activeKey), `Key not found: ${activeKey}`);
		return !items.has(activeKey) || items.get(activeKey)!(false) !== false ?
			(activeKey = undefined, true) :
			false;
	}
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
		activate(key: T, active: boolean) {
			if(!active) 
				return key === activeKey ? deactivate() : true;
			if(activeKey === key) return true;
			console.assert(items.has(key), `Key not found: ${key}`);
			return deactivate() && items.has(key) && items.get(key)!(true);
		}
	})
</script>
<slot />