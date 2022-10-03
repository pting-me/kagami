/// <reference types="vitest" />
import { UserConfig, defineConfig } from 'vite';

import { aliasEntries, workspaceRoot } from './vite.utils';

export const getViteConfig = (projectRoot: string): UserConfig => ({
  resolve: {
    alias: aliasEntries,
  },
  root: projectRoot,
});

export default defineConfig(getViteConfig(workspaceRoot));
