/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

import viteConfig from '../../vite.config';

export default defineConfig(
  mergeConfig(viteConfig, {
    test: {
      passWithNoTests: true,
    },
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
