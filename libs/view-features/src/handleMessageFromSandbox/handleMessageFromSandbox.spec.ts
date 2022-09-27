import handleMessageFromSandbox from './handleMessageFromSandbox';

describe('handleMessageFromSandbox', () => {
  it('handles sandbox message', () => {
    const result = handleMessageFromSandbox('some message');
    expect(result).toBe('some message');
  });
});
