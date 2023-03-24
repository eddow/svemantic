import { browser } from "$app/environment";
import i18n from "../../i18n";
import { actions, type Action } from "./actions";

export interface MessageImmediate {title?: string, content: string}
export interface PromptImmediate extends MessageImmediate {placeholder?: string, defaultValue?: string}
//? fomantic-ui.d.ts
export function alert(text: string|MessageImmediate) {
	new Promise<void>((resolve)=> (<any>jQuery).modal('alert', text, resolve));
}
export function confirm(text: string|MessageImmediate) {
	return new Promise<boolean>((resolve)=> (<any>jQuery).modal('confirm', text, resolve));
}
export function prompt(text: string|PromptImmediate) {
	return new Promise<string>((resolve)=> (<any>jQuery).modal('prompt', text, resolve));
}
// TODO Find a way to do this as semantic-ui ($.modal.setting...) is loaded after the svemantic if svemantic does not import ir
//? fomantic-ui.d.ts
if(browser) ()=> i18n.subscribe(txts=> { (<any>jQuery.fn).modal.settings.text = txts.buttons; });

export interface ModalSettings {
	offset?: number;

	observeChanges?: boolean;
	allowMultiple?: boolean;
	detachable?: boolean;
	closable?: boolean;
	autofocus?: boolean;
	restoreFocus?: boolean;
	inverted?: boolean;
	blurring?: boolean;
	centered?: boolean;

	dimmerSettings?: {
		closable?: boolean,
		useCSS?: boolean
	};

	// whether to use keyboard shortcuts
	keyboardShortcuts?: boolean;

	queue?: boolean;
	duration?: number,
	// TODO transition: 'scale',

	// padding with edge of page
	padding?: number;
	scrollbarWidth?: number;

	// dynamic content
	title?: string;
	content: string;
	class?: string;
	classTitle?: string;
	classContent?: string;
	classActions?: string;
	closeIcon?: string;
	actions?: Action[],
	preserveHTML?: boolean;
}
export function modal<T=any>(content: string|ModalSettings) {
	const spec: ModalSettings = typeof content==='string'?{content}:Object.assign({}, content);
	let rv: Promise<T>|undefined = undefined;
	if(spec.actions) {
		const actSpecs = actions(spec.actions);
		Object.assign(spec, {
			actions: actSpecs.actions,
			onHidden: ()=> actSpecs.resolve(undefined)
		});
		rv = actSpecs.promise;
	}
	(<any>jQuery).modal(spec).modal('show');
	return rv;
}