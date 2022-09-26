import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    cache: {
      dir: path.resolve(
        __dirname,
        '../../node_modules/.vitest/figma-plugin-sandbox'
      ),
    },
  },
  root: path.resolve(__dirname, 'src'),
});
