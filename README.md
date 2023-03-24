
# Svemantic

Now tuned to Fomantic-UI 2.9.2

Library [documentation entrance](./src/lib/README.md)

## Installation

[Fomantic-UI needs some installation steps.](https://fomantic-ui.com/introduction/getting-started.html)
The configuration is provided so that semantic generates in svelte-kit's `static/dist` folder that can be git-ignored.

### TL;DR

```sh
$ cd node_modules/fomantic-ui
$ npx gulp install
```
```sh
$ cd semantic/
$ npx gulp build
```

## What it does and does not

### What it does

- Implements elements by allowing reactive attributes to specific components to interract directly with the classes.
- Implements Semantic-UI jQuery calls with arguments given by reactive attributes
- Makes events or even promises out of call backs
- Automate and re-order some content managements (like Tabs, Grids)
- Centralize internationalization
- Completely typed with typescript

### What it does not

- Implements each and every nuance of Semantic-UI. Some are let to simple class specifications
```html
<div class="ui vertical divider">
and
</div>
```

## Implemented

- [x] Button
- [ ] Container
- ~~Divider~~
- Emoji
- [x] Flag
- [ ] Header
- [x] Icon
- [ ] Image
- [x] Input
- [x] Label
- [ ] List
- [x] Loader
- Placeholder
- Rail
- Reveal
- Segment
- [ ] Step
- Text

### Collections

- [ ] Breadcrumb
- [X] Form
- [x] Grid
- [x] Menu
- [ ] Message
- [x] Table

### Views

- [ ] Advertisement
- [ ] Card
- [ ] Comment
- [ ] Feed
- [ ] Item
- [ ] Statistic

### Modules

- [x] Accordion
- [ ] Calendar
- [x] Checkbox
- [x] Dimmer
- [x] Dropdown
- [ ] Embed
- [ ] Flyout
- [x] Modal
- [ ] Nag
- [x] Popup
- [ ] Progress
- [ ] Rating
- [ ] Search
- [ ] Shape
- [ ] Sidebar
- [ ] Slider
- [ ] Sticky
- [x] Tab	(refactored)
- [x] Toast
- [ ] Transition

## Remaining error

```
@sveltejs/package found the following issues while packaging your library:
You are using SvelteKit-specific imports in your code, but you have not declared a dependency on `@sveltejs/kit` in your `package.json`. Add it to your `dependencies` or `peerDependencies`.
```

If anyone sees which `SvelteKit-specific imports` this message relates to, I would clean it
## How to...
### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

### Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
