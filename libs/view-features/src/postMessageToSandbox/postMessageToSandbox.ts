/**
 * Publishes a message to the sandbox
 */
const postMessageToSandbox = (pluginMessage: any) => {
  window.parent.postMessage({ pluginMessage }, '*');
};

export default postMessageToSandbox;
