import { describe, expect, it, vi } from 'vitest';

import postMessageToSandbox from './postMessageToView';

const mockPostMessage = vi.fn();

vi.stubGlobal('figma', {
  ui: {
    postMessage: mockPostMessage,
  },
});

describe('postMessageToSandbox', () => {
  it('posts message to sandbox', () => {
    postMessageToSandbox({ type: 'foo', payload: 'bar' });
    expect(mockPostMessage).toHaveBeenCalledOnce();
  });
});
