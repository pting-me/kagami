/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import viteConfig from '../../vite.config';

export default defineConfig(
  mergeConfig(viteConfig, {
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
            src: 'assets/**/*',
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
