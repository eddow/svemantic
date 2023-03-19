<script lang="ts">
	import { color, type Color } from '$svemantic/parts/Color';
	import { size, type Size } from '$svemantic/parts/Size';
    import { semantic, uistr, type Forward } from "$svemantic/root";
    import { position, type Position } from '$svemantic/parts/Position';

	type Pointing = 'up'|'down'|'left'|'right'|'';
	type Side = 'left'|'right';
	type Element = 'a'|'div'|'label';
	interface $$Props extends Forward, Size, Color, Position {
		image?: string;
		pointing?: Pointing;
		corner?: Side;
		ribbon?: Side;
		tag?: boolean;
		floating?: boolean|'bottom';
		disabled?: boolean;
		centered?: boolean;
		circular?: boolean;
		basic?: boolean;
		for?: string;
		element?: Element;
	}
	const pointings = {
		'': '',
		up: 'pointing',
		down: 'pointing below',
		left: 'left pointing',
		right: 'right pointing'
	}
	let cs: string;
	export let image: string = '', element: Element = 'a';
	let name: string = '';
	export {name as for}
	$: {
		let {pointing, corner, ribbon, floating, tag, disabled, centered, circular, basic} = $$props;
		cs = uistr('label', $$props, [
			{image: !!image, tag, disabled, centered, circular, basic, corner, ribbon, floating},
			!!pointing && pointings[<Pointing>pointing]
		], size, color, position);
	}
</script>
<svelte:element this={element} class={cs} use:semantic={$$props} for={name}>
	{#if image}<img src={image} alt="" />{/if}
	<slot />
</svelte:element>