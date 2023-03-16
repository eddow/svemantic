<script lang="ts">
    import { uistr, type Forward } from "$lib/classes";
	import { buttonProp, type ButtonProp } from './ButtonProp';
	import { childrenNumber, type ChildrenNumber } from "$lib/parts/Number";

	interface $$Props extends ButtonProp, ChildrenNumber, Forward {
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
<div class={cs}>
	<slot />
</div>