import type { Meta, Story } from '@storybook/react';

import mockManifest from '../mock/mock-manifest.json';
import NodeList from './NodeList';

const { componentSetNodes, componentNodes } = mockManifest;

const meta: Meta = {
  component: NodeList,
  argTypes: {},
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
