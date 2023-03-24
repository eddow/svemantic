<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import Button from '../button/Button.svelte';
    import { getField } from '$svemantic/modules/form';

	interface $$Props extends ComponentProps<Button> {
		name: string;
	}
	const field = getField();
	let directName: string|undefined = undefined,
		name: string|undefined;
	export { directName as name };
	$: name = directName || $field.name;
	
</script>
<input {name} type="file" class="ui invisible file input">
<Button {...$$restProps} el="label" for={name} />
