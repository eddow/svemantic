<script lang="ts">
	import Input from "$svemantic/elements/input/Input.svelte";
    import { field } from "$svemantic/i18n";
	import { clastr, semantic } from "$svemantic/root";
    import type { ComponentProps } from "svelte";
	interface $$Props extends ComponentProps<Input> {
		fluid?: boolean;
		name?: string;
		label?: string|true;
		inputClass?: string;
	}
	export let name: string = '', inputClass: string = '', value: string = '', label: string|true = '';
	let cs: string;
	field(name, label, v=> label = v);

	$: {
		let {fluid} = $$props;
		cs = clastr('field', $$props, {fluid});
	}
</script>
<div class={cs} use:semantic={$$props}>
	<slot name="label">
		{#if label}
			<label for={name}>{label}</label>
		{/if}
	</slot>
	{#if $$slots.default}
		<Input {...$$restProps} {name} bind:value class={inputClass}><slot /></Input>
	{:else}
		<Input {...$$restProps} {name} bind:value class={inputClass} />
	{/if}
</div>