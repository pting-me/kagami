import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { getVitestConfig } from '../../vitest.config';
import project from './project.json';

export default defineConfig(
  mergeConfig(getVitestConfig(project.sourceRoot), {
    plugins: [react()],
  })
);
