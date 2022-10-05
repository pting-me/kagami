import type { Meta, Story } from '@storybook/react';

import DownloadButton, { type DownloadButtonProps } from './DownloadButton';

const meta: Meta<DownloadButtonProps> = {
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
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
export { Primary };
