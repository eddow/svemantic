<script lang="ts">
    import { Button, Field, Form, Input } from "$lib";
	function submit({detail}: CustomEvent) {
		console.dir(detail);
	}
</script>
<table>
	<Form tabular on:submit={submit}>
		<Field name="req" required placeholder="Req-fld" />
		<Field name="opt" placeholder="Opt-fld" />
		<td>
			<Button type="submit">Submit</Button>
		</td>
		<td class="ui error message"></td>
	</Form>
</table>