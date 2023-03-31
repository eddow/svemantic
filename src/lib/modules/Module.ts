import { app } from "$svemantic/globals";
import privateStore from "$svemantic/utils/privateStore";

const emptyF = ()=> {};

export default function Module(access: string, config: any = {}) {
	const forward = privateStore<(...parms: any[])=> any>(emptyF);
	if(!app.browser) return {module: emptyF, forward: forward.store};
	return {
		module(...parms: any[]) {
			if(typeof parms[0] === 'string') return forward.value(...parms);
			if(forward.value !== emptyF) forward.value('destroy');
			const jqn: any = jQuery(parms[0]);
			forward.value = (<(...parms: any[])=> any>jqn[access]).bind(jqn);
			if(parms[1]) Object.assign(config, parms[1]);
			forward.value(config);
			return {destroy() { forward.value('destroy'); }};
		},
		forward: forward.store
	};
}