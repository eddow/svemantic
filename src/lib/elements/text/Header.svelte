<script lang="ts">
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { semantic, uistr, type Forward } from "$lib/root";
    import Icon, { type IconSpec } from '../Icon.svelte';

	interface $$Props extends Forward, Size, Color {
		icon?: IconSpec | boolean;
		sub?: boolean;
	}
	export let icon: IconSpec | boolean | undefined = undefined;
	let cs: string;
	$: {
		let {sub} = $$props;
		cs = uistr('header', $$props, {sub}, size, color);
	}
	// TODO standardise header/item/... w/ header, sub-header, content, ....
</script>
<div class={cs} use:semantic={$$props}>
	{#if typeof icon == 'string'}
		<Icon {icon} />
	{/if}
	<slot name="image" />
	<div class="content">
		<slot />
		{#if $$slots.sub}
			<div class="sub header">
				<slot name="sub" />
			</div>
		{/if}
	</div>
</div>