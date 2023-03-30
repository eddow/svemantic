<script lang="ts">
    import { alert, confirm, Buttons, Button, Field, Form, ModalForm, toast, type ModalFormFunction, NotSaved, Input, Checkbox } from "$svemantic";
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
			throw new NotSaved('Not saved');
	}
	async function testModalPromise() {
		const itm = await modal({first: '', last: 'Pekin'});
		if(itm) toast({message: itm.first + ' ' + itm.last, class: 'info'});
		else toast({message: 'Nope', class: 'warning'});
	}
	const dft = {opt: 'No'};
</script>

<Table compact="very" celled>
	<tr>
		<th>email</th>
		<th>opt</th>
		<th>Agreement</th>
	</tr>
	<Form tabular on:submit={submit} model={dft}>
		<Field name="email" required validate="email"><Input el="td" /></Field>
		<Field name="opt"><Input placeholder="Opt-fld" el="td" /></Field>
		<Field name="agree" required><Checkbox el="td" /></Field>
		<td class="ui buttons">
			<Button submit>Submit</Button>
		</td>
	</Form>
</Table>

<Form on:submit={submit} error-display="manual" model={dft}>
	<Field label name="email" required validate="email"><Input /></Field>
	<Field label name="opt"><Input placeholder="Opt-fld" /></Field>
	<Field name="agree" required><Checkbox label /></Field>
	<div class="ui error message"></div>
	<Button submit>Submit</Button>
</Form>

<div>
	<Button on:click={testModalPromise}>`modal` Promise</Button>	
	<Button on:click={()=> model = {first: '', last: 'Quidam'}}>`save` Promise</Button>
</div>

<NameMf bind:modal>
	<Field label required name="first"><Input fluid /></Field>
	<Field label name="last"><Input fluid /></Field>
	<Buttons slot="actions">
		<Button submit>Submit</Button>
		<Button cancel>Cancel</Button>
	</Buttons>
</NameMf>
<NameMf bind:model {save}>
	<Field required name="first"><Input fluid /></Field>
	<Field name="last"><Input fluid /></Field>
	<Buttons slot="actions">
		<Button submit>Submit</Button>
		<Button cancel>Cancel</Button>
	</Buttons>
</NameMf>