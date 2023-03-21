<script lang="ts">
    import { alert, confirm, Buttons, Button, Field, Form, ModalForm, toast, type ModalFormFunction, ErrorNotSaved } from "$svemantic";
    import Table from "$svemantic/elements/table/Table.svelte";
	function submit({detail}: CustomEvent) {
		console.dir(detail);
	}
	interface Name {
		first: string;
		last: string;
	}
	const NameMf = ModalForm<Name>;
	let modal: ModalFormFunction<Name>;
	let model: Partial<Name>|undefined = undefined;
	async function save(itm: Name) {
		if(!await toast({
			message: itm.first + ' ' + itm.last, classActions: 'left vertical attached',
			actions: [{class: 'green', text: 'Yes', value: true}, {class: 'red', text: 'no', value: false}]})
		)
			throw new ErrorNotSaved('Not saved');
	}
	async function testModalPromise() {
		const itm = await modal({first: '', last: 'Pekin'});
		if(itm) toast({message: itm.first + ' ' + itm.last, class: 'info'});
		else toast({message: 'Nope', class: 'warning'});
	}
</script>
<Table compact="very" celled>
	<Form tabular on:submit={submit}>
		<td><Field name="email" required validate="email" /></td>
		<td><Field name="opt" placeholder="Opt-fld" /></td>
		<td>
			<Button submit>Submit</Button>
		</td>
		<td class="ui error message"></td>
	</Form>
</Table>

<div>
	<Button on:click={testModalPromise}>`modal` Promise</Button>	
	<Button on:click={()=> model = {first: '', last: 'Quidam'}}>`save` Promise</Button>
</div>

<NameMf bind:modal>
	<Field required label="first" name="first" fluid />
	<Field label="last" name="last" fluid />
	<Buttons slot="actions">
		<Button submit>Submit</Button>
		<Button cancel>Cancel</Button>
	</Buttons>
</NameMf>
<NameMf bind:model {save}>
	<Field required label="first" name="first" fluid />
	<Field label="last" name="last" fluid />
	<Buttons slot="actions">
		<Button submit>Submit</Button>
		<Button cancel>Cancel</Button>
	</Buttons>
</NameMf>
