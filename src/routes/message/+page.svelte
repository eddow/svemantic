<script lang="ts">
    import { alert, confirm, prompt, toast, Button, type ModalFunction, Modal } from "$svemantic";
	// TODO use actions

	let modal: ModalFunction, value: string;
	function analyse(ans?: boolean) {
		switch(ans) {
			case true: return `The password is "${value}"`;
			case false: return 'No!';
			case undefined: return '??!?';
		}
	}
</script>
<Button on:click={()=> alert('Alert!')}>Test alert</Button>
<Button on:click={async ()=> toast((await confirm('Confirm?')) ? 'Yes' : 'No')}>Test confirm</Button>
<Button on:click={async ()=> toast((await prompt('Prompt?')) || 'Cancelled')}>Test prompt</Button>

<Button on:click={async ()=> 
	toast(''+(await toast({closeIcon: true, message: 'Message', actions: [{class: 'red fluid', icon: 'trash alternate outline', text: 'A', value: true}]})) || 'Cancelled')
	}>Test toast</Button>

<Button on:click={async ()=> toast((analyse(await modal())))}>Test modal</Button>
<Modal bind:modal>
	<div class="header">Completely custom one</div>
	<div class="content"><input type="password" bind:value /></div>
	<div class="actions">
		<div class="ui deny button">Cancel</div>
		<div class="ui approve button">OK</div>
	</div>
</Modal>