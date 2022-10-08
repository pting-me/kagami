import { MessageToSandbox } from '@kagami/types';

/**
 * Publishes a message to the sandbox
 */
const postMessageToSandbox = (pluginMessage: MessageToSandbox) => {
  window.parent.postMessage({ pluginMessage }, '*');
};

export default postMessageToSandbox;
