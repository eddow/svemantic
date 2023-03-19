<script lang="ts">
    import { Button, Field, Form, Input } from "$svemantic";
	function submit({detail}: CustomEvent) {
		console.dir(detail);
	}
</script>
<table>
	<Form tabular on:submit={submit}>
		<Field name="email" required />
		<!--Field name="opt" placeholder="Opt-fld" /-->
		<td>
			<Button submit>Submit</Button>
		</td>
		<td class="ui error message"></td>
	</Form>
</table>