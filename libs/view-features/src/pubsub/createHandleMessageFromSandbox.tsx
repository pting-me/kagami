import { MessageFromSandbox } from '@kagami/types';

/**
 * Creates a message handler to be assigned to `window.onmessage`
 * @param callback Function that will be called when a message is received from the sandbox
 * @returns The message handler
 */
const createHandleMessageFromSandbox = (
  callback: (pluginMessage: MessageFromSandbox) => void
) => {
  /**
   * Function that will be called when a sandbox message is received
   * Should be assigned to `window.onmessage`
   * @param {MessageEvent<{ pluginMessage: MessageFromSandbox }>} ev `MessageEvent` coming from the sandbox
   */
  const handleMessageFromSandbox = (
    ev: MessageEvent<{ pluginMessage: MessageFromSandbox }>
  ) => {
    // TODO: look at security concerns
    // See: https://www.figma.com/plugin-docs/creating-ui#sending-a-message-from-the-plugin-code-to-the-ui
    const message = ev.data.pluginMessage;
    if (!message) {
      return;
    }

    callback(message);
  };

  return handleMessageFromSandbox;
};

export default createHandleMessageFromSandbox;
