import path from 'path';
import { mergeConfig } from 'vite';
import { UserConfig, defineConfig } from 'vitest/config';

import { getProjectName, workspaceRoot } from './tools/build/vite.utils';
import { getViteConfig } from './vite.config';

export const getVitestConfig = (projectRoot: string): UserConfig => {
  const projectName = getProjectName(projectRoot) ?? '';

  return mergeConfig(getViteConfig(projectRoot), {
    test: {
      environment: 'jsdom',
      cache: {
        dir: path.resolve(workspaceRoot, './node_modules/.vitest', projectName),
      },
      setupFiles: path.resolve(__dirname, './vitest.setup.ts'),
    },
  });
};

export default defineConfig(getViteConfig(workspaceRoot));
