<script lang="ts" context="module">
	
	export interface FieldContext {
		setText(text: string): void;
	}
	const fieldContext = {};	// unique context key
	export function getField(): FieldContext {
		return getContext<FieldContext>(fieldContext);
	}
</script>
<script lang="ts">
    import { field } from "$svemantic/i18n";
	import { clastr, semantic } from "$svemantic/root";
    import { getContext, setContext } from "svelte";
	interface $$Props {
		name?: string;
		label?: string|true;
	}
	export let name: string = '', label: string|true = true;
	let cs: string, receivedText: string = '';
	
	setContext<FieldContext>(fieldContext, {
		setText(text) { receivedText = text; },
	});
	$: cs = clastr('field', $$props);
</script>
<div class={cs} use:semantic={$$props}>
	<slot name="label">
		{#if label && (label !== true || receivedText)}
			<label for={name}>{label === true ? receivedText : label}</label>
		{/if}
	</slot>
	<slot />
</div>