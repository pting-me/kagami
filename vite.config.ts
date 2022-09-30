/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

import tsconfig from './tsconfig.base.json';

export const projectRoot = process.cwd();
export const projectName = path.basename(projectRoot);

// don't use __dirname as it makes rollup confused
export const workspaceRoot =
  process.env['NX_WORKSPACE_ROOT'] ??
  process.env['npm_config_local_prefix'] ??
  path.resolve(projectRoot, '../..');

const pathEntries = Object.entries(tsconfig.compilerOptions.paths);

// assumes 1-1 relationship with paths in tsconfig
export const aliasEntries = pathEntries.map(([alias, [currentPath]]) => ({
  find: alias,
  replacement: path.resolve(workspaceRoot, currentPath),
}));

export default defineConfig({
  resolve: {
    alias: aliasEntries,
  },
  root: path.resolve(projectRoot),
});
