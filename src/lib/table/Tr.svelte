<script lang="ts">
	import { frwstr, type Forward } from "$svemantic/root";
    import { contentColor, type ContentColor } from './ContentColor';

	interface $$Props extends Forward, ContentColor {}
	
	let cs: string;
	$: cs = frwstr($$props, false, contentColor);
</script>
<tr class={cs}>
	<slot />
</tr>
