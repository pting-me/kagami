/**
 * Publishes a message to the view
 */
const postMessageToView = (pluginMessage: any) => {
  // eslint-disable-next-line no-restricted-globals
  // parent.postMessage(pluginMessage, '*');
  figma.ui.postMessage({ type: 'setComponents', payload: 'hello' });
};

export default postMessageToView;
