# Modals

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