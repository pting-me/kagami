import type { Meta, Story } from '@storybook/react';

import Radio from './Radio';

const meta: Meta = {
  title: 'Radio',
  component: Radio,
};

const Primary: Story = {
  render: () => {
    return <Radio id="test-id" />;
  },
};

export default meta;
export { Primary };
