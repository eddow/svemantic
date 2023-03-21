<script lang="ts">
	import { containerProp, type ContainerProp } from './ContainerProp';
    import { semantic, uistr, type Forward } from "$svemantic/root";

	interface $$Props extends Forward, ContainerProp {
		container?: boolean;
	}
	export let container: boolean = false;
	let cs: string;
	$: {
		cs = uistr(container?'grid container':'grid', $$props, false, containerProp);
	}
</script>
<div class={cs} use:semantic={$$props}><slot /></div>