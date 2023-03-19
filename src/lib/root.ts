import { popup, type PopupSettings } from "./modules/popup/Popup.svelte";

export type ClassDescr = string|Record<string,boolean|undefined>|ClassDescr[]|false|null|undefined;

export interface Forward {
	class?: string;
	popup?: PopupSettings | string;
}
export function oneOf(classes: Record<string, string|boolean|undefined>) {
	const used = Object.keys(classes).filter(c=> !!classes[c]), itm = classes[used[0]];
	console.assert(used.length <= 1, `Exclusive properties used : ${used.join(', ')}`);
	return <string|undefined>(!!used.length && itm === true ? used[0] : itm);
}

export function combine(...classes: ClassDescr[]) : string {
	return classes.map(c=>
		!c ? false :
		typeof c === 'string' ? c :
		c instanceof Array ? combine(...c) :
		Object.keys(c).filter(u=> c[u]).join(' ')
	).filter(c=>!!c).join(' ');
}

export function argued(args: Record<string, string|boolean|undefined>) {
	return Object.keys(args).map(k=> args[k] && (args[k] === true ? k : args[k]+' '+k));
}

export function frwstr(props: Forward, classes: ClassDescr = false, ...parts: ((cd: object)=> ClassDescr)[]) : string {
	return combine(classes, props.class, ...parts.map(p=> p(props)));
}
export function clastr(type: string, props: Forward, classes: ClassDescr = false, ...parts: ((cd: object)=> ClassDescr)[]) : string {
	return combine(classes, props.class, ...parts.map(p=> p(props)), type);
}
export function uistr(type: string, props: Forward, classes: ClassDescr = false, ...parts: ((cd: object)=> ClassDescr)[]) : string {
	return combine('ui', classes, props.class, ...parts.map(p=> p(props)), type);
}

export function semantic(node: HTMLElement, frwrd: Forward) {
	function update({popup: ppp}: Forward) {
		if(ppp) popup(node, ppp);
	}
	update(frwrd);
	return { update };
}