export default function Module(access: string, config: any = {}) {
	let forward: (...parms: any[])=> any = ()=> {};
	return function module(...parms: any[]) {
		if(typeof parms[0] === 'string') return forward(...parms);
		forward = (<(...parms: any[])=> any>(<any>jQuery(parms[0]))[access]).bind(parms[0]);
		if(parms[1]) Object.assign(config, parms[1]);
		forward(config);
		return {destroy() { forward('destroy') }};
	}
}