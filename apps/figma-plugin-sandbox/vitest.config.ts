import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import { getVitestConfig } from '../../vitest.config';

export default defineConfig(
  mergeConfig(getVitestConfig(__dirname), {
    test: {
      passWithNoTests: true,
    },
  })
);
