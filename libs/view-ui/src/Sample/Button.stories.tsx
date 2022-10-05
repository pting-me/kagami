import type { Meta, Story } from '@storybook/react';

import Button, { type ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  component: Button,
};

const Primary: Story<ButtonProps> = {
  render: () => {
    return (
      <Button size="default" variant="default" icon={false}>
        Button
      </Button>
    );
  },
};

export default meta;
export { Primary };
