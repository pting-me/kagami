/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { getViteConfig } from '../../vite.config';

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
    build: {
      minify: 'esbuild',
      emptyOutDir: false,
      outDir: path.resolve(__dirname, '../../dist/figma-plugin'),
    },
  })
);
