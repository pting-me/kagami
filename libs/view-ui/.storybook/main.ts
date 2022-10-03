import { mergeConfig } from 'vite';
import { ConfigEnv, UserConfig, UserConfigExport } from 'vitest/config';

import libConfig from '../vite.config';

/**
 * Don't really know where to get these types
 * Not very well documented
 */
interface ViteFinalSecondary {
  parent: {
    args: string[];
  };
}

const getConfigEnv = (options: ViteFinalSecondary): ConfigEnv => {
  if (options.parent.args.includes('dev')) {
    return { command: 'serve', mode: 'development' };
  }

  return { command: 'build', mode: 'production' };
};

interface ProcessConfigOptions {
  configExport: UserConfigExport;
  viteOptions: ViteFinalSecondary;
}

const processConfig = async (
  options: ProcessConfigOptions
): Promise<UserConfig> => {
  const { configExport, viteOptions } = options;

  if (typeof configExport !== 'function') {
    return await configExport;
  }

  return configExport(getConfigEnv(viteOptions));
};

export default {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(sbConfig: UserConfigExport, options: ViteFinalSecondary) {
    const config = await processConfig({
      configExport: libConfig,
      viteOptions: options,
    });
    return mergeConfig(sbConfig, {
      resolve: config.resolve,
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  },
};
