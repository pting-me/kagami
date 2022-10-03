import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import { getVitestConfig } from '../../vitest.config';

export default defineConfig(
  mergeConfig(getVitestConfig(__dirname), {
    plugins: [react()],
  })
);
