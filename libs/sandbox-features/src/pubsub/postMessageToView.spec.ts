import { describe, expect, it, vi } from 'vitest';

import { MessageToView } from '@kagami/types';

import postMessageToSandbox from './postMessageToView';

const mockPostMessage = vi.fn();

vi.stubGlobal('figma', {
  ui: {
    postMessage: mockPostMessage,
  },
});

describe('postMessageToSandbox', () => {
  it('posts message to sandbox', () => {
    const message: MessageToView = {
      type: 'setDownloadInfo',
      payload: {
        download: false,
        filename: 'foo',
        content: 'bar',
      },
    };
    postMessageToSandbox(message);
    expect(mockPostMessage).toHaveBeenCalledWith(message);
  });
});
