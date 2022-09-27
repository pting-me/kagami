/**
 * Publishes a message to the sandbox
 */
const postMessageToSandbox = (pluginMessage: any) => {
  // eslint-disable-next-line no-restricted-globals
  parent.postMessage(pluginMessage, '*');
};

export default postMessageToSandbox;
