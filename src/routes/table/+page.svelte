<script lang="ts">
	import { Table, Column, Td, Th, Selection } from "$svemantic";
	interface Employee {
		id: number;
		first_name: string;
		last_name: string;
		email: string;
		gender: string;
		country: string;
	}
	let ETable = Table<Employee>;
	let EColumn = Column<Employee>;
	let ESel = Selection<Employee>;
	let data = [
		{"id":1,"first_name":"Vivyan","last_name":"Boggas","email":"vboggas0@dyndns.org","gender":"Female","country":"NG"},
		{"id":2,"first_name":"Bev","last_name":"Jirusek","email":"bjirusek1@guardian.co.uk","gender":"Female","country":"GR"},
		{"id":3,"first_name":"Hobard","last_name":"Deppen","email":"hdeppen2@vk.com","gender":"Male","country":"MG"}/*,
		{"id":4,"first_name":"Ly","last_name":"Balmann","email":"lbalmann3@sohu.com","gender":"Bigender","country":"RU"},
		{"id":5,"first_name":"Neron","last_name":"Fairlie","email":"nfairlie4@live.com","gender":"Genderqueer","country":"ID"},
		{"id":6,"first_name":"Loella","last_name":"Emmert","email":"lemmert5@about.com","gender":"Bigender","country":"CN"},
		{"id":7,"first_name":"Tammy","last_name":"Keemar","email":"tkeemar6@umich.edu","gender":"Male","country":"NO"},
		{"id":8,"first_name":"Kathye","last_name":"Dami","email":"kdami7@house.gov","gender":"Female","country":"SE"},
		{"id":9,"first_name":"Robin","last_name":"Kennan","email":"rkennan8@virginia.edu","gender":"Genderfluid","country":"US"},
		{"id":10,"first_name":"Grant","last_name":"Gregine","email":"ggregine9@deliciousdays.com","gender":"Male","country":"SE"},
		{"id":11,"first_name":"Casper","last_name":"Drakeford","email":"cdrakeforda@go.com","gender":"Male","country":"BR"},
		{"id":12,"first_name":"Shayna","last_name":"Morter","email":"smorterb@zimbio.com","gender":"Bigender","country":"NO"},
		{"id":13,"first_name":"Wallache","last_name":"McAree","email":"wmcareec@aol.com","gender":"Male","country":"MN"},
		{"id":14,"first_name":"Christoper","last_name":"Queree","email":"cquereed@creativecommons.org","gender":"Male","country":"PH"},
		{"id":15,"first_name":"Jacki","last_name":"Medendorp","email":"jmedendorpe@mtv.com","gender":"Female","country":"CN"},
		{"id":16,"first_name":"Karl","last_name":"Purkiss","email":"kpurkissf@parallels.com","gender":"Male","country":"GW"},
		{"id":17,"first_name":"Ameline","last_name":"Swannell","email":"aswannellg@jigsy.com","gender":"Female","country":"PT"},
		{"id":18,"first_name":"Lonnie","last_name":"Harpin","email":"lharpinh@domainmarket.com","gender":"Male","country":"RU"},
		{"id":19,"first_name":"Garrett","last_name":"Crecy","email":"gcrecyi@yellowbook.com","gender":"Male","country":"CN"},
		{"id":20,"first_name":"Davita","last_name":"Bradden","email":"dbraddenj@multiply.com","gender":"Female","country":"PH"}*/
	]
	let selection = new Set<Employee>();
</script>

<ETable celled {data} let:row>
	<!--ESel bind:selection /-->
	<EColumn name="first_name">
		<Th part="title">
			First name
		</Th>
		<Td part="data">
			{row.first_name}
		</Td>
	</EColumn>
	<!--
	<EColumn name="last_name">
		<Th part="title">
			Last name
		</Th>
		<Td part="data">
			{row.last_name}
		</Td>
	</EColumn>
	-->
</ETable>
<code>
{JSON.stringify(Array.from(selection), null, '\t')}
</code>