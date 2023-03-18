import { readable, type Readable, type Subscriber } from "svelte/store";

export interface PrivateStore<T=any> {
	get store(): Readable<T>;
	value: T;
}

export default function privateStore<T=any>(value?: any) {
	let set: Subscriber<T> = ()=> {};
	const store = readable<T>(value, setFct=> {
		set = setFct;
		set(value);
		return ()=> { set = <Subscriber<T>>(()=> {}); };
	}), rv = {
		get store() { return store; },
		get value() { return value; },
		set value(nv: T) {
			if(value !== nv) {
				value = nv;
				set(nv);
			}
		}
	};
	return rv;
}