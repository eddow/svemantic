import type { IconSpec } from "$lib/elements/Icon.svelte";

export interface Action<T=any> {
	text: string;
	value: T;
	class?: string;
	icon?: IconSpec;
}
export interface ActionDigest<T=any> {
	actions: any[];
	promise: Promise<T>;
	resolve(value: T): void
}

export function actions<T=any>(input: Action<T>[]) : ActionDigest<T> {
	let actions: any[] = [], resolve: (value: T)=> void = ()=> {};
	const rv = {
		promise: new Promise<T>((resolver)=> {
			actions = input.map(a=> Object.assign({}, a, {click: ()=> {
				rv.resolve = ()=> {};
				resolver(a.value);
			}}));
			resolve = resolver;
		}),
		actions,
		resolve
	};
	return rv;
}