<script lang="ts">
    import { semantic, uistr, type Forward } from "$svemantic/root";
	import { buttonProp, type ButtonProp } from './ButtonProp';
	import { childrenNumber, type ChildrenNumber } from "$svemantic/parts/Number";

	interface $$Props extends Forward, ButtonProp, ChildrenNumber {
		vertical?: boolean;
		stackable?: boolean;
		icon?: boolean;
		wrapping?: boolean;
		spaced?: boolean;
	}

	let cs: string;
	$: {
		let {vertical, stackable, icon, wrapping, spaced} = $$props;
		cs = uistr('buttons', $$props, {vertical, stackable, icon, wrapping, spaced}, buttonProp, childrenNumber());
	}
</script>
<div class={cs} use:semantic={$$props}>
	<slot />
</div>
<style lang="scss" global>
	table tr {
		> th.ui.buttons, > td.ui.buttons {
			display: table-cell;
		}
	}
</style>