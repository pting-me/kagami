import { Parameters } from '@storybook/csf';
import { themes } from '@storybook/theming';

import '../src/styles.css';
import DarkModeDocs from './components/DarkModeDocs';
import ThemeTokenDecorator from './components/ThemeTokenDecorator';

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.light },
  },
  docs: {
    container: DarkModeDocs,
  },
};

export const decorators = [ThemeTokenDecorator];
