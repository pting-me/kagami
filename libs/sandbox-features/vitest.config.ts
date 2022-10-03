import { defineConfig } from 'vitest/config';

import { getVitestConfig } from '../../vitest.config';

export default defineConfig(getVitestConfig(__dirname));
