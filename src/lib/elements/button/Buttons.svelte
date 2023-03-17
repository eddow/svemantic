<script lang="ts">
    import { semantic, uistr, type Forward } from "$lib/root";
	import { buttonProp, type ButtonProp } from './ButtonProp';
	import { childrenNumber, type ChildrenNumber } from "$lib/parts/Number";

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
		cs = uistr('buttons', $$props, {vertical, stackable, icon, wrapping, spaced}, buttonProp, childrenNumber);
	}
</script>
<div class={cs} use:semantic={$$props}>
	<slot />
</div>