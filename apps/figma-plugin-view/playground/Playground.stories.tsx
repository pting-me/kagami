import type { Meta, Story } from '@storybook/react';
import type { FC } from 'react';

import PlaygroundDocs from './Playground.mdx';
import Component, { type Props } from './exampleComponents/Button';
import ResetStyleDecorator from './utils/ResetStyleDecorator';
import createDefaultProps from './utils/createDefaultProps';

const ChildrenOverride: FC = () => {
  // Use this if you want to create a `children` property to pass into the component
  return <>Playground story</>;
};

const renderChildrenOverride = () => <ChildrenOverride />;

const defaultProps = createDefaultProps<Props>(Component);

const meta: Meta<Props> = {
  title: 'Test Component',
  component: Component,
  parameters: {
    docs: {
      page: PlaygroundDocs,
    },
  },
  decorators: [ResetStyleDecorator],
  argTypes: {
    ref: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
};

const WithNodeProps: Story<Props> = {
  args: {
    ...defaultProps,
  },
  render: (args) => {
    return <Component {...args} />;
  },
};

const WithChildrenOverride: Story<Props> = {
  args: {
    ...defaultProps,
    children: renderChildrenOverride(),
  },
  render: (args) => {
    return <Component {...args} />;
  },
};

export default meta;
export { WithNodeProps, WithChildrenOverride };
