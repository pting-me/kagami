import type { Meta, Story } from '@storybook/react';

import PlaygroundDocs from './Playground.mdx';
import Component, { type Props } from './exampleComponents/Button';

const defaultProps: Partial<Props> = {
  /* add default props here */
  children: 'Playground Component',
};

const meta: Meta<Props> = {
  title: 'Test Component',
  component: Component,
  parameters: {
    docs: {
      page: PlaygroundDocs,
    },
  },
};

const Primary: Story<Props> = {
  args: { ...defaultProps },
  render: (args) => {
    return <Component {...args} />;
  },
};

export default meta;
export { Primary };
