/// <reference types="vitest" />
import { UserConfig, defineConfig } from 'vite';

import { getAliasEntries, workspaceRoot } from './tools/build/vite.utils';

export const getViteConfig = (projectRoot: string): UserConfig => ({
  resolve: {
    alias: getAliasEntries(),
  },
  root: projectRoot,
});

export default defineConfig(getViteConfig(workspaceRoot));
