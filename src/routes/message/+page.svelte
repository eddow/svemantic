<script lang="ts">
    import { alert, confirm, prompt, toast, Button } from "$svemantic";
	// TODO use actions
</script>
<Button on:click={()=> alert('Alert!')}>Test alert</Button>
<Button on:click={async ()=> toast((await confirm('Confirm?')) ? 'Yes' : 'No')}>Test confirm</Button>
<Button on:click={async ()=> toast((await prompt('Prompt?')) || 'Cancelled')}>Test prompt</Button>
