/**
 * Publishes a message to the view
 */
const postMessageToView = (pluginMessage: any) => {
  figma.ui.postMessage(pluginMessage);
};

export default postMessageToView;
