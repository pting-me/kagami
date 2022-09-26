import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

import vitestConfig from '../../vitest.config';

export default defineConfig(
  mergeConfig(vitestConfig, {
    plugins: [react()],
  })
);
