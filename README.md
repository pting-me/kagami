# Figma React Template

This is a starting template for building a Figma app using React.

## Getting started

This project uses Yarn workspaces, so you will need to have [Yarn installed](https://yarnpkg.com/getting-started/install) before proceeding.

### Install packages

```sh
yarn
```

### Run dev environment

```sh
yarn dev
```

Assets will be placed in `dist/dev`.

### Open in Figma

Follow [instructions here](https://help.figma.com/hc/en-us/articles/360042786733-Create-a-plugin-for-development#Create_a_plugin) to open your plugin in Figma. You do not need to create a new plugin from template. The manifest is located in `dist/dev/manifest.json`.

Your changes will be updated via the watch scripts, but you will need to manually update the plugin within Figma using **Plugins > Run last plugin**.

## Publishing

To do a production build, run:

```sh
yarn build
```

## Project structure

This is an [Nx package-based monorepo](https://nx.dev/tutorials/package-based-repo-tutorial).

- `iframe` - Code that can access the browser APIs
  - Built using `vite`
  - Note that `vite dev` doesn't output files, so we have to use `vite build`
- `sandbox` - Code that can access the Figma "scene"
  - Built using `esbuild`
  - Note that the sandbox js is incompatible with `module` and `import` syntax, so we can only load the script using IIFE
  - Parcel 2 and SWC have been considered, but do not support IIFE
- `common` - Common code to be shared between the `iframe` and `sandbox`

[See here](https://www.figma.com/plugin-docs/how-plugins-run) for more information on Figma plugin architecture.
