# Modals

## In general

A `Modal` has a bindable `modal` attribute who is set to a function who returns a promise, resolving when the modal closes to `boolean?` according to the button used (`undefined` if the modal was closed another way)

```html
<script lang="ts">
	let modal: ModalFunction
	...
	if(await modal()) ...
</script>

<Modal bind:modal>
	...
</Modal>

```

All attributes and parameters given to Fomantic-UI' [`$.modal`](https://fomantic-ui.com/modules/modal.html) function.

## Modal forms

Modal forms are complex `confirm` that can edit a model (through a form).

Modal forms automatically manage `submit`, `approve` and `cancel` buttons. `approve` buttons *do not* go through validation while `submit` one do.

### Access through `modal`

Like with regular modals, `ModalForm` binds a `modal` function, taking a model as argument (to set the data in the form) and returning a promise that will
- give a new validated model on submission
- be rejected if the user cancels

### Access through the `save` function

If the modal brings server-side reaction, interraction can be done through `save` callback *(not event as it returns a promise)*. 

Note: throw an `NotSaved` to specify a managed refusal, its message will be toasted if it is not empty.

Setting the `model` of the Modal form is equivalent to using `opened`

```html
<script lang="ts">
	async function save(model: MyModel) {
		if(!await doServerStuff(model)) throw NotSaved('Server error');
	}
	let model: myModel;
</script>
<Button on:click={()=> model = {...}}>Modal</Button>
<ModalForm bind:model bind:save ...
```

### Access through the `model` function

Like with regular form, `ModalForm` have a 2-ways binding of `model`.
In order to use it properly, [`on="change"` or at least `on="blur"`](https://fomantic-ui.com/behaviors/form.html#form-settings) if any validation should be involved.