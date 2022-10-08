import { MessageFromView } from '@kagami/types';

/**
 * Creates a message handler to be assigned to `figma.ui.onmessage`
 * @param callback Function that will be called when a message is received from the view
 * @returns The message handler
 */
const createHandleMessageFromView = (
  callback: (pluginMessage: MessageFromView) => void
) => {
  /**
   * Function that will be called when a view message is received
   * Should be assigned to `figma.ui.onmessage`
   * @param {MessageFromView} message coming from the sandbox
   */
  const handleMessageFromView = (message: MessageFromView) => {
    callback(message);
  };

  return handleMessageFromView;
};

export default createHandleMessageFromView;
