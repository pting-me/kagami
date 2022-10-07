/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { getViteConfig } from '../../vite.config';

const envEntries = [];

const isProd = process.env['NODE_ENV'] === 'production';

if (isProd) {
  envEntries.push({
    find: './environments/environment',
    replacement: './environments/environment.prod',
  });
}

const manifestCopy = isProd
  ? {
      src: path.resolve(__dirname, 'src/assets/manifest.prod.json'),
      dest: path.resolve(__dirname, '../../dist/figma-plugin'),
      rename: 'manifest.json',
    }
  : {
      src: path.resolve(__dirname, 'src/assets/manifest.json'),
      dest: path.resolve(__dirname, '../../dist/figma-plugin'),
    };

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
        targets: [manifestCopy],
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
