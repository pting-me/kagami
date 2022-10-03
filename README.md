# Kagami

Kagami is a Figma component built in React.

## Quick start

### Installation

You will need `pnpm` for installation.

```
pnpm i
```

For most other repository actions, Kagami uses [Nx](https://nx.dev) for code organization and running.

### Running

You will need to build the project, and then run it using the Figma desktop app.

```
pnpm build
```

This will generate a component that can be imported into Figma from `dist/figma-plugin/manifest.json`.

### Testing

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

- libs/sandbox-features/src/createHandleMessageFromView
- libs/sandbox-features/src/postMessageToView
- libs/view-features/src/createHandleMessageFromSandbox
- libs/view-features/src/postMessageToSandbox

### Structure

This is a monorepo structure. The `apps` folder is mainly used for building and scaffolding, while the majority of the logic is placed into the `libs` folder.

Both the **Sandbox** and the **View** need to be single files. There's no "server" like you would see in a typical React project, and the Figma Plugin API doesn't support any sort of `require` or `import` functionality.

The **Sandbox** is built using Rollup and ESBuild.

The **View** uses Vite and plugins to roll everything up into one file.

### Tools

#### Repo management

- Nx
- pnpm

#### Build tooling

- Rollup
- ESBuild
- Vite

These have been chosen as the "next generation" build tooling. It removes a lot of build time, and modern browsers don't need all the compiling that is done by Babel and Webpack.

#### Testing and linting

- ESLint
- Vitest
  - Vitest has been chosen over Jest because of its compatibility with Vite. There is a Cypress application scaffolding that was added by Nx but is not currently in use.
- Testing Library
- Prettier
- Storybook (TBD)

#### Frameworks

- React
- Tailwind
- ReachUI
  - Chosen for minimal bloat

## Todo

- Add testing environment (like Storybook)
  - Should add Storybook v7 - try to avoid any Babel or Webpack since we're purely using Vite
- Add functionality to highlight component on click
- Add functionality to select which components to export
- Add more boilerplate code for the components
