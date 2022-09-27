import { ContextAction } from '../MessageContext/MessageContext';

/**
 * Creates a message handler to be assigned to `window.onmessage`
 * @param callback - Function that will be called when a sandbox message is received
 * @returns - The message handler
 */
const createHandleMessageFromSandbox = (
  callback: (pluginMessage: ContextAction) => void
) => {
  /**
   * Function that will be called when a sandbox message is received
   * Should be assigned to `window.onmessage`
   * @param ev - `MessageEvent` coming from the sandbox
   */
  const handleMessageFromSandbox = (
    ev: MessageEvent<{ pluginMessage: ContextAction }>
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
