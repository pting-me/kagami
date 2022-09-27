/**
 * Publishes a message to the view
 */
const postMessageToView = (pluginMessage: any) => {
  // eslint-disable-next-line no-restricted-globals
  parent.postMessage(pluginMessage, '*');
};

export default postMessageToView;
