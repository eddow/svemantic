<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";
    import Icon, { type IconSpec } from '../Icon.svelte';

	interface $$Props extends Forward, Size, Color {
		icon?: IconSpec | boolean;
		dividing?: boolean;
		sub?: boolean;
	}
	export let icon: IconSpec | boolean | undefined = undefined;
	let cs: string;
	$: {
		let {sub, dividing} = $$props;
		cs = uistr('header', $$props, {sub, dividing}, size, color);
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