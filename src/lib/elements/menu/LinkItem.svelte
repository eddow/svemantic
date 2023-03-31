<script lang="ts">
	import Icon, { type IconSpec } from '$svemantic/elements/Icon.svelte';
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { clastr, semantic, type Forward } from "$svemantic/root";
	import { position, type Position } from "$svemantic/parts/Position";
    import { onDestroy } from 'svelte';
    import { app } from '$svemantic/globals';

	interface $$Props extends Forward, Size, Color, Position {
		href?: string;
		text?: string;
		icon?: IconSpec;
	}
	export let icon: IconSpec = '', text: string = '', href: string|undefined = undefined;
	let cs: string, active: boolean;
	
	onDestroy(app.pathname.subscribe(pn=> { active = pn === href; }));
	$: cs = clastr('item', $$props, {active}, size, color, position);
</script>
<a class={cs} use:semantic={$$props} {href} on:click>
	{#if icon}<Icon {icon}/>{/if}
	<slot>
		{text}
	</slot>
</a>