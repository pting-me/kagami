import { describe, expect, it, vi } from 'vitest';

import postMessageToSandbox from './postMessageToSandbox';

describe('postMessageToSandbox', () => {
  it('posts message to parent window', () => {
    const messageSpy = vi.spyOn(window.parent, 'postMessage');

    postMessageToSandbox('some message');
    expect(messageSpy).toHaveBeenCalledOnce();
  });
});
