# Forms and fields

Forms and fields are managed using contexts.

Note: fomantic `dirty` flag management is quite unefficient and, until now, just forwarded.

## Contexts

### Form context

In a form (whether way the form is created), a `FormContext<T>` is retrieved with `getForm<T>()` and gives access to information and functionality of the form being described.

Note, its `forward` Readable function is a shortcut to `$(...).form(...)`. IE: `$forward('do something', parms)` is equivalent to `$(myNode).form('do something', parms)`. It is declared as a `Readable` as it is initialized to an empty function (that returns `undefined`)

### Field context

`Readable<{name: string, text: string}>` retrieved with `getField()` gives the name and text of the field. Note: the `text` is the title, not the value of the field, and uses the `i18n` centralization : It is refreshed on the fly if `$i18n` is interracted with.

## Form definition

### With the element

Make the 'ui ... form' element that contains all the fields and commands

```html
<Form el="div" let:dirty>
	...
```

Errors are always displayed in any `ui error message` container from within the form

### Without the element

```html
<Formed let:form let:forward let:dirty
		on:submit="function(event: {values, context})"
		on:failure="function(event: {values, fields, context})"
		on:cancel="function()"
	>
	<nav use:form>
		...
```

Allows the (here `nav`) node to use the Fomantic `form` module. `$forward(...)` is used as `$(...).form(...)` would be used.

### Attributes

- `el`: **"div"**
- `error-display`: **'popup'** | 'inline' | 'manual'
 * 'popup': Creates a on-hover tooltip to erroneous fields
 * 'inline': equivalent to form' `inline: true`
 * 'manual': Do not add any error display

### Events

The `context` if the `FormContext` allowing to interract with the form with semantic interface.

## Fields definition

All the form validation appear here, the Input only manages the appearance and content behaviour.

### Attributes
- `name`
- `label`: boolean | string
  - **`false`**: Do not show
  - `true`: Show the automatic translation with `name` and `i18n`
  - string: Show the specified text
- `required`
- `validate` Can be :
  - an array of `Rule`
	```ts
	interface Rule {
		type: string;
		value?: any;
		prompt?: string | ((value: any)=> string);
	}
	```
  - an array of string (ex. `['minLength[6]', 'email']`)
  - a string with '&'-separated validations (ex. `'minLength[6]&email'`)
    - Beware an "&" cannot appear in arguments as there is no custom syntax verification

### Events
- `validated(e: CustomEvent<string[]|undefined>)`: Used when the field is (un)validate to specify the errors if any.