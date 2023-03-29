import { browser } from "$app/environment";

const emptyF = ()=> {};

export default function Module(access: string, config: any = {}) {
	if(!browser) return emptyF;
	let forward: (...parms: any[])=> any = emptyF;
	return function module(...parms: any[]) {
		if(typeof parms[0] === 'string') return forward(...parms);
		if(forward !== emptyF) forward('destroy');
		forward = (<(...parms: any[])=> any>(<any>jQuery(parms[0]))[access]).bind(parms[0]);
		if(parms[1]) Object.assign(config, parms[1]);
		forward(config);
		return {destroy() { forward('destroy'); }};
	}
}