import { DocsContainer, DocsContainerProps } from '@storybook/addon-docs';
import addons from '@storybook/addons';
import { themes } from '@storybook/theming';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useDarkMode } from 'storybook-dark-mode';

import '../src/styles.css';
import { Token } from './themes/types';

const DarkModeDocs: FC<DocsContainerProps> = (props: DocsContainerProps) => {
  const darkMode = useDarkMode();
  const theme = darkMode ? themes.dark : themes.light;

  return (
    <div>
      <DocsContainer {...props} theme={theme} />
    </div>
  );
};

export const parameters = {
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

interface ProviderProps extends PropsWithChildren {}

const ThemeTokenProvider: FC<ProviderProps> = (props: ProviderProps) => {
  const { children } = props;
  const darkMode = useDarkMode();
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const getTokens = async () => {
      if (darkMode) {
        setTokens((await import('./themes/dark-theme-tokens')).default);
      } else {
        setTokens((await import('./themes/light-theme-tokens')).default);
      }
    };

    void getTokens();
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;

    tokens.forEach(({ key, value }) => {
      root.style.setProperty(key, value);
    });
  }, [tokens]);

  // This needs to be wrapped up to satisfy the FC return type
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export const decorators = [
  (Story: FC) => (
    <ThemeTokenProvider>
      <Story />
    </ThemeTokenProvider>
  ),
];
