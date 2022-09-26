/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';

import tsconfig from './tsconfig.base.json';

export const getAliasEntries = (dirnameOverride?: string) => {
  const dirname = dirnameOverride ?? __dirname;

  const pathEntries = Object.entries(tsconfig.compilerOptions.paths);
  // assumes 1-1 relationship with paths in tsconfig
  return pathEntries.map(([alias, [currentPath]]) => ({
    find: alias,
    replacement: path.resolve(dirname, currentPath),
  }));
};

export const getViteConfig = (sourceRoot: string, dirnameOverride?: string) => {
  const dirname = dirnameOverride ?? __dirname;
  return {
    resolve: {
      alias: getAliasEntries(dirnameOverride),
    },
    root: path.resolve(dirname, sourceRoot),
  };
};

export default defineConfig(getViteConfig(''));
