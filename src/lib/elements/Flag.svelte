<script lang="ts">
	import { size, type Size } from "$svemantic/parts/Size";
    import { clastr, semantic, type Forward } from "$svemantic/root";

	interface $$Props extends Forward, Size {
		code: string;
	}
	let cs: string;
	$: {
		let {code} = $$props;
		cs = clastr('flag', $$props, code, size);
	}
	
</script>
<i class={cs} use:semantic={$$props}></i>