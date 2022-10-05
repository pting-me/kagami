import type { Meta, Story } from '@storybook/react';

import MessageContext, { type ContextState } from '../MessageContext';
import mockManifest from '../mock/mock-manifest.json';
import MainLayout from './MainLayout';

const meta: Meta = {
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

const Primary: Story<StoryArgs> = {
  render: (args) => {
    const { width, height } = args;
    return (
      <MessageContext.Provider value={mockManifest as unknown as ContextState}>
        <div
          className="border overflow-scroll"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <MainLayout />
        </div>
      </MessageContext.Provider>
    );
  },
};

export default meta;
export { Primary };
