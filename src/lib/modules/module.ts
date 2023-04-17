import { app } from "$svemantic/globals";
import privateStore from "$svemantic/utils/privateStore";
import type { Readable } from "svelte/store";

export type ModuleFunction = (...parms: any[])=> any;
export interface Module extends ModuleFunction, Readable<ModuleFunction> {}

const emptyF = ()=> {};
export default function module(access: string, config: any = {}) {
	const forward = privateStore<ModuleFunction>(emptyF);
	if(!app.browser) return Object.assign(()=>{}, {subscribe: forward.store.subscribe});
	return Object.assign(
		(...parms: any[])=> {
			if(typeof parms[0] === 'string') return forward.value(...parms);
			if(forward.value !== emptyF) forward.value('destroy');
			const jqn: any = jQuery(parms[0]);
			forward.value = (<(...parms: any[])=> any>jqn[access]).bind(jqn);
			if(parms[1]) Object.assign(config, parms[1]);
			forward.value(config);
			return {destroy() { forward.value('destroy'); }};
		}, {
			subscribe: forward.store.subscribe
		});
}