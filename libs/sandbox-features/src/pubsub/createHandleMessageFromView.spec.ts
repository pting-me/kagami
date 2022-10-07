import { describe, expect, it, vi } from 'vitest';

import createHandleMessageFromView from './createHandleMessageFromView';

describe('createHandleMessageFromView', () => {
  it('creates handler and callback fires correctly', () => {
    const callback = vi.fn();
    const handler = createHandleMessageFromView(callback);
    const mockMessage = { type: 'foo', payload: 'bar' };
    handler(mockMessage);
    expect(callback).toBeCalledWith(mockMessage);
  });
});
