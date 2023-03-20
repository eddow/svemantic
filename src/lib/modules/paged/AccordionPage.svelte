<script lang="ts">
	interface $$Props {
		key?: string;
	}
	//export let key = null;
</script>
<div class="title">
	<i class="dropdown icon"></i>
	<slot name="header" />
</div>
<div class="content">
	<slot />
</div>
