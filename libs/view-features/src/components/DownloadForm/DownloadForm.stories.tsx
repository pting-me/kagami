import type { Meta, Story } from '@storybook/react';

import DownloadForm from './DownloadForm';

const meta: Meta = {
  title: 'DownloadForm',
  component: DownloadForm,
};

const Primary: Story = {
  render: () => {
    return <DownloadForm id="test-id" />;
  },
};

export default meta;
export { Primary };
