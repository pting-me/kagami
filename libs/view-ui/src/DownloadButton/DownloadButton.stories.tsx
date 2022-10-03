import type { Meta, Story } from '@storybook/react';

import DownloadButton, { DownloadButtonProps } from './DownloadButton';

const meta: Meta<DownloadButtonProps> = {
  title: 'ViewUi/DownloadButton',
  component: DownloadButton,
  argTypes: {},
};

const Primary: Story<DownloadButtonProps> = {
  args: {
    filename: 'test.txt',
    dataBlob: ['This is some data'],
    mimeType: 'text/plain',
    children: 'Download',
  },
};

export default meta;
export { Primary };
