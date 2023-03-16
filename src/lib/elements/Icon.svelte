<script lang="ts" context="module">
	export type IconSpec = string | string[];
</script>
<script lang="ts">
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { argued, clastr, type Forward } from "$lib/classes";

	export let icon: IconSpec;
	let collection: boolean;
	$: collection = !!icon && typeof icon != 'string';

	interface $$Props extends Size, Color, Forward {
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
	<i class={cs}>
		{#each icon as i}
			<i class={i+' icon'}></i>
		{/each}
	</i>
{:else}
<i class={cs}></i>
{/if}