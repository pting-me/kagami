import type { Meta, Story } from '@storybook/react';
import type { FC } from 'react';

import PlaygroundDocs from './Playground.mdx';
import Component, { type Props } from './exampleComponents/Button';
import createDefaultProps from './utils/createDefaultProps';

const Children: FC = () => {
  // Use this if you want to create a `children` property to pass into the component
  return <>Playground story</>;
};

const renderChildren = () => <Children />;

const defaultProps = {
  ...createDefaultProps<Props>(Component),
  children: renderChildren(),
};

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
