import postMessageToSandbox from './postMessageToSandbox';

describe('postMessageToSandbox', () => {
  it('posts message to parent window', () => {
    // eslint-disable-next-line no-restricted-globals
    const messageSpy = vi.spyOn(parent, 'postMessage');

    postMessageToSandbox('some message');
    expect(messageSpy).toHaveBeenCalledOnce();
  });
});
