# All svemantic

### Initialization

In your application root, the global `app` can be managed. It contains two values:
- `browser: boolean` is false on SSR and true on CSR
- `pathname: Writable<string>` gives the actual location

Without further modification, `browser` only states if `window` is defined, and `pathname` gives the location at which the psge has been loaded when on the client-side (no SSR connection)

If you use a router, make it manage the `app.pathname` value.

#### Svelte-kit users

In your root loader - for example root layout with svelte-kit :

```ts
import { app } from 'svemantic';
import { browser } from '$app/environment';
import { page } from "$app/stores";

app.browser = browser;	// No need for reactivity here
page.subscribe((p: Page)=> app.pathname.set(p.url.pathname));
```

## Documentation

"Attributes" stand for HTML attributes while "Flags" are used for boolean HTML attributes.

If the names match, these follow and simply mean what was intended by Semantic-UI.

## Elements

- [Table](./elements/table/README.md) define all the generic table parts

## Modules

- [Paged](./modules/paged/README.md) define `Accordions`, `Tabs` and `Steps`
- [Popup](./modules/popup/README.md) allows to bind popups to elements
- [Messages](./modules/messages/README.md) are functions allowing standard small interractions with the user (alert, prompt, confirm, toast, ...)
- [Modal](./modules/modal/README.md) designs custom modals
## [Parts](./parts/README.md)

These are not components so to speak but common configurations of several components. Each are refered when used

## Internationalization

The store `i18n` contains a tree of all the translations.

All items are self-explanatory, beside :
- `cmd` who list regular command' (button) text
- `fld` used by `Fields` and `Columns` to write labels or titles from input name.