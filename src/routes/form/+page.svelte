<script lang="ts">
    import { alert, confirm, Buttons, Button, Field, Form, ModalForm, toast, type ModalFormFunction, ErrorNotSaved, Input, Checkbox } from "$svemantic";
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
	<tr>
		<th>email</th>
		<th>opt</th>
		<th>Agreement</th>
	</tr>
	<Form tabular on:submit={submit}>
		<Input placeholder name="email" required validate="email" />
		<Input name="opt" placeholder="Opt-fld" />
		<td><Checkbox name="agree" /></td>
		<td class="ui buttons">
			<Button submit>Submit</Button>
		</td>
	</Form>
</Table>
<!--
<Form on:submit={submit} error-display="manual">
	<Field label="email" name="email" required validate="email" />
	<Field label="optional" name="opt" placeholder="Opt-fld" />
	<Field><Checkbox name="agree" label="Agreement" /></Field>
	<div class="ui error message"></div>
	<Button submit>Submit</Button>
</Form>

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
-->