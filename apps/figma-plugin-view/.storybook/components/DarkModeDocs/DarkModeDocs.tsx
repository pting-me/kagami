import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs';
import { themes } from '@storybook/theming';
import { FC } from 'react';
import { useDarkMode } from 'storybook-dark-mode';

const DarkModeDocs: FC<DocsContainerProps> = (props: DocsContainerProps) => {
  const darkMode = useDarkMode();
  const theme = darkMode ? themes.dark : themes.light;

  return (
    <div>
      <DocsContainer {...props} theme={theme} />
    </div>
  );
};
export default DarkModeDocs;
