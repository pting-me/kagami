import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
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
