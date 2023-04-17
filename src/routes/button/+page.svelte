<script lang="ts">
	import { Checkbox, Button, Buttons, type ColorName } from "$svemantic";
	// TODO icon label text
	const next: { [P in ColorName]?: ColorName } = {red: 'blue', blue: 'green', green: 'red'};
	let color: ColorName = 'red', circular = false, value: boolean|undefined;
	function toggle() {
		color = next[color]!;
		circular = !circular
	}
</script>
<div>
	<Buttons attached="top">
		<Button>bs A</Button>
		<Button loading>bs B</Button>
		<Button>bs C</Button>
	</Buttons>
</div>
<div>
	<Button circular>circular</Button>
	
	<Button icon="heart" label="hearts" />
	<Button circular icon="heart">heart slot</Button>
	<Button {circular} icon="heart" {color} text="heart text" on:click={toggle} />
</div>
<div>
	<Checkbox bind:value label="try3" />
	<Checkbox bind:value label="try3" toggle />
	<Checkbox bind:value label="try3" slider />
	<Buttons>
		<Button icon="check square outline" on:click={()=> value=true} />
		<Button icon="square outline" on:click={()=> value=false} />
		<Button icon="minus square outline" on:click={()=> value=undefined} />
	</Buttons>
</div>