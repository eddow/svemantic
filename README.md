
# Svemantic

## Implemented

- [x] Button
- [ ] Container
- --Divider--
- [ ] Emoji
- [x] Flag
- [ ] Header
- [x] Icon
- [ ] Image
- [x] Input
- [x] Label
- [ ] List
- [x] Loader
- [ ] Placeholder
- [ ] Rail
- [ ] Reveal
- [ ] Segment
- [ ] Step
- [ ] Text

### Collections

- [ ] Breadcrumb
- [X] Form
- [ ] Grid
- [x] Menu
- [ ] Message
- [ ] Table

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
- [ ] Checkbox
- [x] Dimmer
- [-] Dropdown
- [ ] Embed
- [ ] Flyout
- [x] Modal
- [ ] Nag
- [ ] Popup
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
