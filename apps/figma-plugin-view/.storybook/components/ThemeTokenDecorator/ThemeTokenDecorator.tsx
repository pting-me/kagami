import { FC, ReactElement } from 'react';

import ThemeTokenProvider from './ThemeTokenProvider';

const ThemeTokenDecorator = (Story: FC): ReactElement => (
  <ThemeTokenProvider>
    <Story />
  </ThemeTokenProvider>
);

export default ThemeTokenDecorator;
