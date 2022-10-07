import type { Meta, Story } from '@storybook/react';

import mockContext from '../../mock/context.json';
import NodeList from './NodeList';

const { componentSetNodes, componentNodes } = mockContext;

const meta: Meta = {
  title: 'NodeList',
  component: NodeList,
};

const ComponentSets: Story = {
  render: () => {
    return (
      <NodeList
        nodes={componentSetNodes as unknown as ComponentSetNode[]}
        type="COMPONENT_SET"
      />
    );
  },
};

const Components: Story = {
  render: () => {
    return (
      <NodeList
        nodes={componentNodes as unknown as ComponentNode[]}
        type="COMPONENT"
      />
    );
  },
};

export default meta;
export { ComponentSets, Components };
