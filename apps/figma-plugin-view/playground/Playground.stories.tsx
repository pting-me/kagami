import type { Meta, Story } from '@storybook/react';
import type { FC } from 'react';

import PlaygroundDocs from './Playground.mdx';
import Component, { type Props } from './exampleComponents/Button';
import './reset.css';
import createDefaultProps from './utils/createDefaultProps';

const Children: FC = () => {
  // Use this if you want to create a `children` property to pass into the component
  return <>Playground story</>;
};

const renderChildren = () => <Children />;

const defaultProps = createDefaultProps<Props>(Component);

const meta: Meta<Props> = {
  title: 'Test Component',
  component: Component,
  parameters: {
    docs: {
      page: PlaygroundDocs,
    },
  },
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

const Default: Story<Props> = {
  args: defaultProps,
  render: (args) => {
    return <Component {...args} />;
  },
};

const WithChildrenOverride: Story<Props> = {
  args: {
    ...defaultProps,
    children: renderChildren(),
  },
  render: (args) => {
    return <Component {...args} />;
  },
};

export default meta;
export { Default, WithChildrenOverride };
