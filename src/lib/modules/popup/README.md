# Popup

## By JS configuration object

Every svemantic object has a `popup` attribute taking a [`SemanticUI.PopupSpecifications`](https://fomantic-ui.com/modules/popup.html#/settings) value.

Elements have access to this with `use:popup`, calling the exact same function.

The argument is a string or a configuration object.

Note: all the selectors/jQuery object are here given as `HTMLElement` (that can be retrieved with `bind:this` on elements)

```html
<a use:popup={{title: 'This title...', content: 'That tooltip...'}} ... />
<a use:popup="This other tooltip..." ... />
```

## By popup definition

A popup can be defined in a `<Popup...` tag whose attributes are :
- The settings of a popup
- The variants of a popup
- a `config` to bind (given by the `Popup` object)

To bind this popup, you can :
1- Bind `config` and use its value in the `popup=...` or `use:popup=...` statement

```html
<script lang="ts">
	...
	let ppp: PopupSettings;	// Do not initialize, use or modify
</script>

<Popup bind:config={ppp} ... />

<span use:popup={ppp} ... />
```
2- Place the tooltip **just after** the element it should bind to. If that element could be re-rendered or modified afterward, this solution might bring some bugs.

```html
<span ... />
<Popup ... />
```

Note: if `config` is bounf, the element before the `Popup` remains untouched.