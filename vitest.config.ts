import { defineConfig } from 'vitest/config';
import path from 'path';

import { getViteConfig } from './vite.config';
import { mergeConfig } from 'vite';

export const getCacheDir = (sourceRoot: string, dirnameOverride?: string) => {
  const dirname = dirnameOverride ?? __dirname;
  return path.resolve(dirname, './node_modules/.vitest', sourceRoot);
};

export const getVitestConfig = (
  sourceRoot: string,
  dirnameOverride?: string
) => {
  const viteConfig = getViteConfig(sourceRoot, dirnameOverride);
  const dirname = dirnameOverride ?? __dirname;

  return mergeConfig(viteConfig, {
    test: {
      environment: 'jsdom',
      globals: true,
      cache: {
        dir: path.resolve(dirname, './node_modules/.vitest', sourceRoot),
      },
    },
  });
};

export default defineConfig(getVitestConfig(''));
