import { browser } from "$app/environment";
import i18n from "../../i18n";
import { actions, type Action } from "./actions";

/* on
	onShow: function () {},
	onVisible: function () {},
	onClick: function () {},
	onHide: function () {},
	onHidden: function () {},
	onRemove: function () {},
	onApprove: function () {},
	onDeny: function () {},
 */
interface ToastSetting {
	position?: 'top right'|'top center'|'top left'|'bottom right'|'bottom center'|'bottom left'|'centered',
	horizontal?: boolean,
	class?: 'neutral'|'info'|'success'|'warning'|'error',
	classProgress?: string,
	classActions?: string,
	classImage?: 'mini'|'tiny'|'small'|'avatar',

	title?: string,
	message: string,
	displayTime?: number|'auto', // set to zero to require manually dismissal, otherwise hides on its own
	minDisplayTime?: number, // minimum displaytime in case displayTime is set to 'auto'
	wordsPerMinute?: number,
	showIcon?: boolean|string,
	newestOnTop?: boolean,
	showProgress?: false,
	pauseOnHover?: boolean,
	progressUp?: boolean, // if true, the bar will start at 0% and increase to 100%
	opacity?: number,
	compact?: boolean,
	closeIcon?: boolean,
	closeOnClick?: boolean,
	cloneModule?: boolean,
	actions?: Action[],
	preserveHTML?: boolean,
	showImage?: string
}

//? fomantic-ui.d.ts
if(browser) i18n.subscribe(txts=> { (<any>jQuery.fn).toast.settings.text = txts.pppControl; })
export function toast<T=any>(message: string|ToastSetting) {
	const spec: ToastSetting = typeof message==='string'?{message}:Object.assign({}, message);
	let rv: Promise<T>|undefined = undefined;
	if(spec.actions) {
		const actSpecs = actions(spec.actions);
		Object.assign(spec, {
			actions: actSpecs.actions,
			onHidden: ()=> actSpecs.resolve(undefined)
		});
		rv = actSpecs.promise;
	}
	(<any>jQuery).toast(spec);
	return rv;
}