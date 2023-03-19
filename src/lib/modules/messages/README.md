# Messages

These are few async functions to intteract by sending a message to the user and perhaps `await` for its interraction.

## Message boxes

As it uses Fomantic-UI>2.8.8 code, these promises might **never** resolve

- `alert` displays a message
- `confirm` displays a message with yes/no buttons
- `prompt` Displays a message and an input box the user can fill

### Examples

```typescript
alert('Oh, a message...');
alert({content: 'A message!', title: 'Look here'});

if(await confirm({content: 'Choose wisely...', title: 'Please,'})) { ... }

alert(await prompt({content: 'Choose wisely...', title: 'Enter a value', placeholder: 'Please do', default: 'nothing'}))
```

## Generic modal

The `modal` function allows to define a specific `alert`/`confirm` modal as such :

- Each specified action defines a `value`
- The promise resolves to the used action' value, of `undefined` if the modal was closed without an action

The only argument is a configuration object similar to Fomantic-UI' [`$.modal`](https://fomantic-ui.com/modules/modal.html) function.

## Toasts

The `toast` function act exactly as `modal`, letting each `action` defining a value, to whose the promise resolves when an action is clicked of `undefined` if the toast is closed without an action.

The only argument is a configuration object similar to Fomantic-UI' [`$.toast`](https://fomantic-ui.com/modules/toast.html) function.