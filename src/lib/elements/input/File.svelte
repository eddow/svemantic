<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import Button from '../button/Button.svelte';

	interface $$Props extends ComponentProps<Button> {
		name: string;
	}
	export let name: string;
	
</script>
<input {name} type="file" class="ui invisible file input">
<Button {...$$restProps} element="label" for={name} />
