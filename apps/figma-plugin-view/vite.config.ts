/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { getViteConfig } from '../../vite.config';

const envEntries = [];

if (process.env['NODE_ENV'] === 'production') {
  envEntries.push({
    find: './environments/environment',
    replacement: './environments/environment.prod',
  });
}

export default defineConfig(
  mergeConfig(getViteConfig(__dirname), {
    test: {
      passWithNoTests: true,
    },
    root: path.resolve(__dirname, 'src'),
    plugins: [
      react(),
      viteSingleFile(),
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, 'src/assets/**/*'),
            dest: path.resolve(__dirname, '../../dist/figma-plugin'),
          },
        ],
      }),
    ],
    resolve: {
      alias: envEntries,
    },
    build: {
      minify: 'esbuild',
      emptyOutDir: false,
      outDir: path.resolve(__dirname, '../../dist/figma-plugin'),
    },
  })
);
