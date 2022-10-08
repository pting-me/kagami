import { describe, expect, it, vi } from 'vitest';

import { MessageFromView } from '@kagami/types';

import createHandleMessageFromView from './createHandleMessageFromView';

describe('createHandleMessageFromView', () => {
  it('creates handler and callback fires correctly', () => {
    const callback = vi.fn();
    const handler = createHandleMessageFromView(callback);
    const mockMessage: MessageFromView = {
      type: 'focusNode',
      payload: { id: 'foo' },
    };
    handler(mockMessage);
    expect(callback).toBeCalledWith(mockMessage);
  });
});
