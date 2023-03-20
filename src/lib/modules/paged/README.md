# Paging system

Used by accordions, tabs and steps.
Each of these controllers use `Page`s who barely have a key, a header slot and a content (default slot).

Each of these page containers are therefore used like this:
```html
<SomePageContainer>
	<Page key="k1">
		<h1 slot="header">Title 1</h1>
		Lorem ipsum One maxima
	</Page>
	<Page>
		<svelte:fragment slot="header">Title 2</svelte:fragment>
		Lorem ipsum Two maxima
	</Page>
</SomePageContainer>
```

Page without specified keys will have an automatically generated one as it is used internally (of the form "`#xx`" where `xx` is a number)

## Accordions

Nothing fancy implemented - just works but interactions have to use Fomantic-UI

No attributes nor flags

## Tabs

Completely re-implemented (only the CSS is used) - so, no loading, history or ajax content

### Attributes

- `tabs` **top** | bottom
- `headerClass` CSS Classes to give to the `<div class="ui ... tabuler menu">` header container
- `active` Bindable active page key. Can be used to change it programatically, follow its change or simply initialize it

### Flags

- `inverted` Invert the colors

## Steps

TODO