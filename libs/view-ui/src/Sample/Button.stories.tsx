import type { Meta, Story } from '@storybook/react';

import Button, { type ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  component: Button,
};

const Primary: Story<ButtonProps> = {
  args: {
    size: 'default',
    variant: 'default',
    icon: false,
  },
  render: (args) => {
    return <Button {...args}>Button</Button>;
  },
};

export default meta;
export { Primary };
