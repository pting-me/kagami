import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import path from 'path';

import viteConfig, { workspaceRoot, projectName } from './vite.config';

export default defineConfig(
  mergeConfig(viteConfig, {
    test: {
      environment: 'jsdom',
      globals: true,
      cache: {
        dir: path.resolve(workspaceRoot, './node_modules/.vitest', projectName),
      },
    },
  })
);
