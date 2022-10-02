import path from 'path';
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import viteConfig, { projectName, workspaceRoot } from './vite.config';

export default defineConfig(
  mergeConfig(viteConfig, {
    test: {
      environment: 'jsdom',
      globals: true,
      cache: {
        dir: path.resolve(workspaceRoot, './node_modules/.vitest', projectName),
      },
      setupFiles: path.resolve(__dirname, './vitest.setup.ts'),
    },
  })
);
