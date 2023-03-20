<script lang="ts" context="module">
    import { getContext, setContext } from "svelte";
	const rowContext = {};
	export interface RowContext<T=any> {
		part?: string;
		data?: Writable<T>;
		genColumnKey(): number;
	};
	export function getRow<T extends RowContext<any> = RowContext<any>>() {
		return getContext<T>(rowContext);
	}
</script>
<script lang="ts">
	import { frwstr, type Forward } from "$svemantic/root";
    import { contentColor, type ContentColor } from '../ContentColor';
    import { writable, type Writable } from "svelte/store";

	type T = $$Generic;

	interface $$Props extends Forward, ContentColor {
		part?: string;
		data?: T;
		context?: any;
	}
	export let part: string|undefined = undefined, context: any = {}, data: T|undefined = undefined;
	let dataStore = writable<T|undefined>(data), gndKeys = 0;
	$: dataStore.set(data);
	dataStore.subscribe(nv=> { data = nv; });
	setContext<RowContext<T>>(rowContext, Object.assign(Object.create(context), {
		part, data: dataStore,
		genColumnKey: () => gndKeys++
	}));
	let cs: string;
	$: cs = frwstr($$props, false, contentColor);
</script>
<tr class={cs}>
	<slot />
</tr>
