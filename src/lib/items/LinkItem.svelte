<script lang="ts">
	import Icon, { type IconSpec } from '$lib/elements/Icon.svelte';
    import Item from './Item.svelte';
	import { color, type Color } from '$lib/parts/Color';
	import { size, type Size } from '$lib/parts/Size';
    import { clastr, type Forward } from "$lib/classes";
	import { position, type Position } from "$lib/parts/Position";
	import { page } from "$app/stores";

	interface $$Props extends Forward, Size, Color, Position {
		href: string;
	}
	export let icon: IconSpec = '', text: string = '';
	export let href: string;
	let cs: string, active: boolean;
	$: active = $page.url.pathname === href;
	$: {
		cs = clastr('item', $$props, {active}, size, color, position);
	}
</script>
<Item bind:active>
	<a class={cs} {href}>
		<slot>
			{#if icon}<Icon {icon}/>{/if}
			{text}
		</slot>
	</a>
</Item>