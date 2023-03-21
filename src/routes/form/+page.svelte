<script lang="ts">
    import { alert, confirm, Buttons, Button, Field, Form, ModalForm, toast, type ModalFormFunction } from "$svemantic";
	function submit({detail}: CustomEvent) {
		console.dir(detail);
	}
	interface name {
		first: string;
		last: string;
	}
	const NameMf = ModalForm<name>;
	let modal: ModalFormFunction<name>;
	let opened = false;
	async function save(itm: any) {
		if(!await confirm(itm.first + ' ' + itm.last))
			throw "Not saved";
	}
	async function testModalPromise() {
		const itm = await modal();
		if(itm) toast({message: itm.first + ' ' + itm.last, class: 'info'});
		else toast({message: 'Nope', class: 'warning'});
	}
</script>
<table>
	<Form tabular on:submit={submit}>
		<Field name="email" required validate="email" />
		<Field name="opt" placeholder="Opt-fld" />
		<td>
			<Button submit>Submit</Button>
		</td>
		<td class="ui error message"></td>
	</Form>
</table>
<div>
	<Button on:click={testModalPromise}>`modal` Promise</Button>	
	<Button on:click={()=> opened = true}>`save` Promise</Button>
</div>
<NameMf bind:modal>
	<Field required label="first" name="first" fluid />
	<Field label="last" name="last" fluid />
	<Buttons slot="actions">
		<Button submit>Submit</Button>
		<Button cancel>Cancel</Button>
	</Buttons>
</NameMf>
<NameMf bind:opened {save}>
	<Field required label="first" name="first" fluid />
	<Field label="last" name="last" fluid />
	<Buttons slot="actions">
		<Button submit>Submit</Button>
		<Button cancel>Cancel</Button>
	</Buttons>
</NameMf>