# Table

## Attributes and flags

All attributes and flags describing the `<table>` tag are used with the same name.

Not implemented: `sortable`, `full-width`

## Generic usage

`Table`, `Tr`, `Th` and `Td` (along with `Cell` who takes an `element = 'td'|'th'` attribute) are forwarded straight to use their attributes as class part

## Generated usage

A table can also be defined with these three slots : `head`, `data` and `foot`.

```html
<script lang="ts">
	...
	const MTable = Table<MyClass>;
	let data: MyClass[];
	...
</script>
	...
	<MTable {data}>
		<thead slot="head">...</thead>
		<Tr slot="data" let:row>
			<Td>{row.field}</Td>
			...
```
