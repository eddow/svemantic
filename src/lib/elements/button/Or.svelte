<script lang="ts">
    import { clastr, semantic, type Forward } from "$svemantic/root";
    import i18n from "$svemantic/i18n";
	export let text: string = '';
	$: if(!text) text = $i18n.or;
	interface $$Props extends Forward {
		text?: string
	}
	$: cs = clastr('or', $$props);
</script>
<div class={cs} use:semantic={$$props} data-text={text}></div>