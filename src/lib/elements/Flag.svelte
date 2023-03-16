<script lang="ts">
	import { size, type Size } from '$lib/parts/Size';
    import { clastr, type Forward } from "$lib/classes";

	interface $$Props extends Size, Forward {
		code: string;
	}
	let cs: string;
	$: {
		let {code} = $$props;
		cs = clastr('flag', $$props, code, size);
	}
	
</script>
<i class={cs}></i>