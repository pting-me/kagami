import type { Meta, Story } from '@storybook/react';

import DownloadButton, { type DownloadButtonProps } from './DownloadButton';

const meta: Meta<DownloadButtonProps> = {
  title: 'DownloadButton',
  component: DownloadButton,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
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
