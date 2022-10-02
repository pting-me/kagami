import react from '@vitejs/plugin-react';
import path from 'path';
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import vitestConfig from '../../vitest.config';

export default defineConfig(
  mergeConfig(vitestConfig, {
    plugins: [react()],
    test: {
      css: true,
    },
  })
);
