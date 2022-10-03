import type { StorybookConfig } from '@storybook/builder-vite';
import type { Options } from '@storybook/core-common';
import react from '@vitejs/plugin-react';
import path from 'path';
import { mergeConfig } from 'vite';
import { ConfigEnv, UserConfig, UserConfigExport } from 'vitest/config';

import appConfigExport from '../vite.config';

const getConfigEnv = (options: Options): ConfigEnv => {
  if (options.configType === 'DEVELOPMENT') {
    return { command: 'serve', mode: 'development' };
  }

  return { command: 'build', mode: 'production' };
};

interface ProcessConfigOptions {
  configExport: UserConfigExport;
  sbOptions: Options;
}

const processConfig = async (
  options: ProcessConfigOptions
): Promise<UserConfig> => {
  const { configExport, sbOptions } = options;

  if (typeof configExport !== 'function') {
    return await configExport;
  }

  return configExport(getConfigEnv(sbOptions));
};

const storybookConfig: StorybookConfig = {
  stories: [
    path.resolve(__dirname, '../../../libs/view-*/src/**/*.stories.mdx'),
    path.resolve(
      __dirname,
      '../../../libs/view-*/src/**/*.stories.@(js|jsx|ts|tsx)'
    ),
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(inlineConfig, sbOptions) {
    const config = await processConfig({
      configExport: appConfigExport,
      sbOptions,
    });
    return mergeConfig(inlineConfig, {
      cacheDir: path.resolve(
        __dirname,
        '../../../node_modules/.vite-storybook/figma-plugin-view'
      ),
      resolve: config.resolve,
      plugins: [react()],
      build: {
        minify: 'esbuild',
        emptyOutDir: false,
        outDir: path.resolve(__dirname, '../../../dist/storybook'),
      },
    });
  },
};

export default storybookConfig;
