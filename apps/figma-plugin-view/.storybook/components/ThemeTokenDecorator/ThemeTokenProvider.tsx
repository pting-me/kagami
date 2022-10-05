import { FC, PropsWithChildren, useEffect } from 'react';
import { useDarkMode } from 'storybook-dark-mode';

import darkThemeTokens from '../../themes/dark-theme-tokens';
import lightThemeTokens from '../../themes/light-theme-tokens';

interface Props extends PropsWithChildren {}

const ThemeTokenProvider: FC<Props> = (props: Props) => {
  const { children } = props;
  const darkMode = useDarkMode();

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      darkThemeTokens.forEach(({ key, value }) => {
        root.style.setProperty(key, value);
      });
    } else {
      lightThemeTokens.forEach(({ key, value }) => {
        root.style.setProperty(key, value);
      });
    }
  }, [darkMode]);

  // This needs to be wrapped up to satisfy the FC return type
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default ThemeTokenProvider;
