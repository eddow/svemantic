<script lang="ts">
	import { Table, Td, Th, Tr } from "$svemantic";
	interface Employee {
		id: number;
		first_name: string;
		last_name: string;
		email: string;
		gender: string;
		country: string;
	}
	const MTable = Table<Employee>;
	let data = [
		{"id":1,"first_name":"Vivyan","last_name":"Boggas","email":"vboggas0@dyndns.org","gender":"Female","country":"NG"},
		{"id":2,"first_name":"Bev","last_name":"Jirusek","email":"bjirusek1@guardian.co.uk","gender":"Female","country":"GR"},
		{"id":3,"first_name":"Hobard","last_name":"Deppen","email":"hdeppen2@vk.com","gender":"Male","country":"MG"}
	]
</script>
<MTable celled {data} selectable>
	<thead slot="head">
		<Tr>
			<Th>First name</Th>
			<Th>Last name</Th>
			<Th>E Mail</Th>
		</Tr>
	</thead>
	<Tr slot="data" let:row>
		<Td>{row.first_name}</Td>
		<Td>{row.last_name}</Td>
		<Td>{row.email}</Td>
	</Tr>
</MTable>