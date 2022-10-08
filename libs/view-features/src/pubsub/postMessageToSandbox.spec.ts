import { describe, expect, it, vi } from 'vitest';

import { MessageToSandbox } from '@kagami/types';

import postMessageToSandbox from './postMessageToSandbox';

describe('postMessageToSandbox', () => {
  it('posts message to parent window', () => {
    const messageSpy = vi.spyOn(window.parent, 'postMessage');
    const pluginMessage: MessageToSandbox = {
      type: 'focusNode',
      payload: { id: 'foo' },
    };
    postMessageToSandbox(pluginMessage);
    expect(messageSpy).toHaveBeenCalledWith({ pluginMessage }, '*');
  });
});
