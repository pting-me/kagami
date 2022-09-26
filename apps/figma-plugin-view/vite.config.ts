/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

import tsconfig from '../../tsconfig.base.json';

const mapAliasEntries = (paths: typeof tsconfig.compilerOptions.paths) => {
  const pathEntries = Object.entries(paths);
  // assumes 1-1 relationship with paths in tsconfig
  return pathEntries.map(([alias, [currentPath]]) => ({
    find: alias,
    replacement: path.resolve(`../../${currentPath}`),
  }));
};

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    passWithNoTests: true,
    cache: {
      dir: path.resolve(
        __dirname,
        '../../node_modules/.vitest/figma-plugin-view'
      ),
    },
  },
  root: path.resolve(__dirname, 'src'),
  plugins: [
    react(),
    viteSingleFile(),
    viteStaticCopy({
      targets: [
        {
          src: 'assets/**/*',
          dest: path.resolve(__dirname, '../../dist/figma-plugin'),
        },
      ],
    }),
  ],
  resolve: {
    alias: mapAliasEntries(tsconfig.compilerOptions.paths),
  },
  build: {
    minify: 'esbuild',
    emptyOutDir: false,
    outDir: path.resolve(__dirname, '../../dist/figma-plugin'),
  },
});
