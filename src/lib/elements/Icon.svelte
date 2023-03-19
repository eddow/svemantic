<script lang="ts" context="module">
	export type IconSpec = string | string[];
</script>
<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { argued, clastr, semantic, type Forward } from "$svemantic/root";

	export let icon: IconSpec;
	let collection: boolean;
	$: collection = !!icon && typeof icon != 'string';

	interface $$Props extends Forward, Size, Color {
		icon: string|string[];
		disabled?: boolean;
		loading?: boolean;
		fitted?: boolean;
		link?: boolean;
		circular?: boolean;
		bordered?: boolean;
		colored?: boolean;
		flipped?: 'horizontally'|'vertically';
		rotated?: 'clockwise'|'counterclockwise';
	}

	let cs: string;
	$: {
		let {disabled, loading, fitted, link, circular, bordered, colored, flipped, rotated} = $$props;
		cs = clastr(collection? 'icons' : 'icon', $$props, [
			collection? false : icon,
			argued({flipped, rotated}),
			{disabled, loading, fitted, link, circular, bordered, colored}
		], size, color);
	}
	// Corner ("top right corner", ...) is specified in the code of unity icons
</script>
{#if collection}
	<i class={cs} use:semantic={$$props}>
		{#each icon as i}
			<i class={i+' icon'}></i>
		{/each}
	</i>
{:else}
<i class={cs} use:semantic={$$props}></i>
{/if}