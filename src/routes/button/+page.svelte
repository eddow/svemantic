<script lang="ts">
	import { Button, Buttons } from "$svemantic";
	// TODO icon label text
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
	<Button circular icon="heart" text="heart text" />
</div>