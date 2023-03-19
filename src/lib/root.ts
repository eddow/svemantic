import { popup, type PopupSettings } from "./modules/popup/Popup.svelte";

type baseCD = string|boolean|undefined;
export type ClassDescr = baseCD|Record<string,baseCD|ClassDescr[]>|ClassDescr[];

export interface Forward {
	class?: string;
	popup?: PopupSettings | string;
}
export function oneOf(classes: Record<string, ClassDescr>) {
	const used = Object.keys(classes).filter(c=> !!classes[c]), itm = classes[used[0]];
	console.assert(used.length <= 1, `Exclusive properties used : ${used.join(', ')}`);
	return <string|undefined>(!!used.length && itm === true ? used[0] : combine(itm));
}

export function combine(...classes: ClassDescr[]) : string {
	return classes.map(c=>
		!c ? false :
		typeof c === 'string' ? c :
		c instanceof Array ? combine(...c) :
		c instanceof Object ? Object.keys(c).filter(k=> !!c[k])
			.map(k=> c[k] === true ? k : (combine(c[k])+ ' ' + k)).join(' ') :
		new Error('Bad ClassDescr', {cause: c})
	).filter(c=>!!c).join(' ');
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