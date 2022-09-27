/**
 * Creates a message handler to be assigned to `figma.ui.onmessage`
 * @param callback - Function that will be called when a sandbox message is received
 * @returns - The message handler
 */
const createHandleMessageFromView = (
  callback: (pluginMessage: any) => void
) => {
  /**
   * Message handler to be assigned to `figma.ui.onmessage`
   * @param ev
   */
  const handleMessageFromView = (ev: any) => {
    callback(ev);
  };

  return handleMessageFromView;
};

export default createHandleMessageFromView;
