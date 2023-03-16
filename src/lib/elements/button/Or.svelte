<script lang="ts">
    import { clastr, type Forward } from "$lib/classes";
    import i18n from "$lib/i18n";
	export let text: string = '';
	$: if(!text) text = $i18n.or;
	interface $$Props extends Forward {
		text?: string
	}
	$: cs = clastr('or', $$props);
</script>
<div class={cs} data-text={text}></div>