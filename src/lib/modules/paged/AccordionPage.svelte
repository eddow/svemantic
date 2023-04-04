<script lang="ts">
	interface $$Props {
		key?: string;
		active?: boolean;
	}
	export let active: boolean|undefined = undefined;
	//export let key = null;
</script>
<div class="title" class:active>
	<i class="dropdown icon"></i>
	<slot name="header" />
</div>
<div class="content" class:active>
	<slot />
</div>
