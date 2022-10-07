import type { Meta, Story } from '@storybook/react';

import mockManifest from '../../mock/context.json';
import ViewContext from '../ViewContext';
import MainLayout from './MainLayout';

const meta: Meta = {
  title: 'MainLayout',
  component: MainLayout,
  argTypes: {
    width: { control: 'number', defaultValue: 240 },
    height: { control: 'number', defaultValue: 427 },
  },
};

interface StoryArgs {
  width: number;
  height: number;
}

interface MockManifestProps {
  componentNodes: ComponentNode[];
  componentSetNodes: ComponentSetNode[];
}

const Development: Story<StoryArgs> = {
  render: (args) => {
    const { width, height } = args;
    return (
      <ViewContext.Provider
        value={{
          ...(mockManifest as unknown as MockManifestProps),
          environment: { production: false },
        }}
      >
        <div
          className="border overflow-scroll"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <MainLayout />
        </div>
      </ViewContext.Provider>
    );
  },
};

const Production: Story<StoryArgs> = {
  render: (args) => {
    const { width, height } = args;
    return (
      <ViewContext.Provider
        value={{
          ...(mockManifest as unknown as MockManifestProps),
          environment: { production: true },
        }}
      >
        <div
          className="border overflow-scroll"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <MainLayout />
        </div>
      </ViewContext.Provider>
    );
  },
};

export default meta;
export { Development, Production };
