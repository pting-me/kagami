import type { Meta, Story } from '@storybook/react';

import Checkbox from './Checkbox';

const meta: Meta = {
  title: 'Checkbox',
  component: Checkbox,
};

const Primary: Story = {
  render: () => {
    return <Checkbox id="test-id" />;
  },
};

const Base: Story = {
  render: () => {
    return <input type="checkbox" style={{ appearance: 'none' }} />;
  },
};

export default meta;
export { Primary, Base };
