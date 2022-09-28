/**
 * Creates a message handler to be assigned to `figma.ui.onmessage`
 * @param callback Function that will be called when a message is received from the view
 * @returns The message handler
 */
const createHandleMessageFromView = (
  callback: (pluginMessage: any) => void
) => {
  /**
   * Function that will be called when a view message is received
   * Should be assigned to `figma.ui.onmessage`
   * @param ev `MessageEvent` coming from the sandbox
   */
  const handleMessageFromView = (ev: any) => {
    callback(ev);
  };

  return handleMessageFromView;
};

export default createHandleMessageFromView;
