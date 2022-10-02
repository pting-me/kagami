import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    passWithNoTests: true,
    cache: {
      dir: path.resolve(
        __dirname,
        '../../node_modules/.vitest/figma-plugin-sandbox'
      ),
    },
  },
  root: path.resolve(__dirname, 'src'),
});
