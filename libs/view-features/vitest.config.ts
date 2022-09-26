import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    cache: {
      dir: path.resolve(
        __dirname,
        '../../node_modules/.vitest/figma-plugin-view'
      ),
    },
  },
  root: path.resolve(__dirname, 'src'),
  plugins: [react()],
});
