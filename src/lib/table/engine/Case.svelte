<script lang="ts" context="module">
    import { setSwitch, type Match } from "./Switch.svelte";
	export interface SelectContext {
		addCase?(key: number, match: string[]): void;
	};
</script>
<script lang="ts">
	export let columnKey: number;

	setSwitch(columnKey);
</script>
<slot />