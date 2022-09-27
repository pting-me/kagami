import handleMessageFromView from './handleMessageFromView';

describe('handleMessageFromView', () => {
  it('handles view message', () => {
    const result = handleMessageFromView('some message');
    expect(result).toBe('some message');
  });
});
