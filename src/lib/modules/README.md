# Modules

## Generic modules

`svemantic` exports the function `module` who takes an access name and default configuration as a parameter, giving back a module action and a forward function' store.

### Usage

```html
<script>
	import { module } from 'svemantic';
	const something = module('something', configA);
	let prop: any;
	$: $something('set prop', prop);
</script>

<div use:something={configB}> ... </div>
```

This code is the equivalent of, if `xxx` correspond to the div having the `use:module`, calling :
- `(()=> {})('set prop', prop)` (just ignored)
- `$(xxx).something({...configA, ...configB})` 
- `$(xxx).something('set prop', prop)`

`something` is a store whose value is set when the module is initialized, containing the bound function for that module. So that `$something('set prop', prop);` will be first evaluated with an empty function, then with the correct call once the module is bound and each time `prop` changes afterward.

### Notes

- SSR just resolves in a lot of calls of an empty function