# Kagami

Kagami is a [Figma plugin](https://www.figma.com/community/plugin/1158610128178447057) for creating React components.

## Quick start

### Requirements

- [pnpm](https://pnpm.io/installation) for package management
- [Figma Desktop App](https://www.figma.com/downloads/)
  - Note that the in-browser version of Figma can't load our plugins from code

### Installation

```
pnpm i
```

The warnings on peer dependencies for Storybook and ReachUI are known issues.

### Running the app in Figma

You will need to build the project, and then run it using the Figma desktop app.

```
pnpm build
```

This will generate a plugin that can be imported into Figma from `dist/figma-plugin/manifest.json`. The generated plugin will be in developer mode, and include additional logging and development features.

To generate the production mode version:

```
pnpm build-prod
```

### Development and Testing

#### Running Storybook

For local development, we recommend using [Storybook](https://storybook.js.org/) to test out your changes, before building and loading into Figma.

To run Storybook:

```
pnpm start
```

Please note that we're using Storybook v7 which is in alpha mode, and we're also omitting the traditional Webpack build in favor of Vite. You may need to refresh the Storybook on load to get everything to work properly.

### Testing downloaded components

You can use Storybook to load the downloaded components and test out the properties. There are utilities written in [`apps/figma-plugin-view/playground`](apps/figma-plugin-view/playground) which automatically generates several things for your exported components.

### Unit tests

```
pnpm test
```

To test each library individually:

```
nx test sandbox-features
nx test view-features
nx test view-ui
```

## Architecture

### Overview

This project encapsulates the logic that is split when building Figma plugins into two parts:

1. **Sandbox** - This is the "JavaScript" portion of the plugin.
2. **View** - This is the "HTML" portion of the plugin that will be placed directly into the plugin `iframe`.

The Sandbox and View have distinctly different contexts, so care must be taken not to mix up the logic. All folders in `libs` have been clearly marked.

Please see the [Figma Plugin documentation](https://www.figma.com/plugin-docs/how-plugins-run) for more details.

### Messaging

Messages are passed using a PubSub model. Specific implementation details are not consistent, so the logic has been encapsulated into the following:

- [`libs/sandbox-features/src/pubsub`](libs/sandbox-features/src/pubsub)
- [`libs/view-features/src/pubsub`](libs/view-features/src/pubsub)

### Structure

This is a monorepo structure. The `apps` folder is mainly used for building and scaffolding, while the majority of the logic is placed into the `libs` folder.

Both the **Sandbox** and the **View** need to be single files. There's no "server" like you would see in a typical React project, and the Figma Plugin API doesn't support any sort of `require` or `import` functionality.

The **Sandbox** is built using ESBuild.

The **View** uses Vite (which also uses ESBuild under the hood).

### Tools

#### Repo management

- [Nx](https://nx.dev)
- [pnpm](https://pnpm.io)

#### Build tooling

- [ESBuild](https://esbuild.github.io/)
- [Vite](https://vitejs.dev)

These have been chosen as the "next generation" build tooling. It removes a lot of build time, and modern browsers don't need all the compiling that is done by Babel and Webpack.

#### Testing and linting

- [ESLint](https://eslint.org)
- [Vitest](https://vitest.dev)
  - Vitest has been chosen over Jest because of its compatibility with Vite. There is a Cypress application scaffolding that was added by Nx but is not currently in use.
- [Testing Library](https://testing-library.com)
- [Prettier](https://prettier.io)
- [Storybook](https://storybook.js.org/)

#### Frameworks

- [React](https://reactjs.org)
- [Tailwind](https://tailwindcss.com)
- [ReachUI](https://reach.tech)

## Todo

- Fix issue with Checkbox and Radio in Figma (likely solved by migrating to CSS modules)
- Fix issue with Combobox in Figma (likely need to change the ReachUI config)
- Move Checkbox and Radio to `view-ui`
- Move `handlebars` loading from `sandbox` to `view`
  - Possibly import from URL like Prettier
- Refactor sandbox `main.ts` logic into `libs`
- Refactor NodeList
  - Remove the recursion
  - Split logic between "Standalone Component" and "Subcomponent"
- Add functionality for standalone components
- Test on more components and design systems
