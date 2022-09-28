# Hashi

Hashi is a Figma component built in React.

## Quick start

### Installation

Hashi uses `pnpm` for installation.

```
pnpm i
```

### Running

You will need to build the project, and then run it using the Figma desktop app.

### Testing

Hashi uses Nx for code organization and running.

```
nx test sandbox-features
nx test view-features
```

## Architecture

This project encapsulates the logic that is split when building Figma plugins into two parts:

1. Sandbox
2. View

## Todo

- Add testing environment (like Storybook)
- Add exporting to JSON
- Add in templates (determine to use plop or nunjucks or something else)
- Add functionality to highlight component on click
- Add functionality to select which components to export
- Fill out more details in README
- Convert project to Tailwind
