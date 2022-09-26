/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    root: path.resolve(__dirname, '../..'),
    cache: {
      dir: path.resolve(__dirname, '../../node_modules/.vitest/figma-plugin-view'),
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
          dest: path.resolve(__dirname, '../../dist'),
        },
      ],
    }),
  ],
  build: {
    minify: 'esbuild',
    outDir: path.resolve(__dirname, '../../dist'),
  },
});
