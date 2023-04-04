<script lang="ts" context="module">
	export type InputType = 'text'|'email'|'number'|'range'|'password'|'search'|'tel'|'url'|'time'|'date'|'month'|'week'|'datetime-local'|'color'|'file'|'area';
	// not done here: checkbox radio hidden reset button submit 
	//? image
</script>
<script lang="ts">
    import { onDestroy, createEventDispatcher } from 'svelte';
    import { getField } from '$svemantic/modules';
	
	function handleInput(e: any) {
		value = (<any>e.target!).value;
		dispatch('input', value);
	}

	const dispatch = createEventDispatcher();
	export let
		type: InputType = 'text',
		value: any = '',
		autofocus: boolean = false,
		readonly: boolean = false,
		name: string|undefined = undefined,
		placeholder: string = '';
	const field = getField();
	if(field?.default) onDestroy(field.default.subscribe((v: string)=> value = v));
</script>
{#if type === 'area'}
	<textarea {readonly} {placeholder} {autofocus} {value} {name} on:input={handleInput}></textarea>
{:else}
	<input {readonly} {placeholder} {autofocus} {type} {value} {name} on:input={handleInput} />
{/if}
<style lang="scss" global>
	.ui.fluid.input > textarea {
		flex: 1 0 auto;
	}
</style>