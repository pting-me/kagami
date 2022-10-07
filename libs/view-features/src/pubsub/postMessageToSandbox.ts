interface Message {
  type: string;
  payload: unknown;
}

/**
 * Publishes a message to the sandbox
 */
const postMessageToSandbox = (pluginMessage: Message) => {
  window.parent.postMessage({ pluginMessage }, '*');
};

export default postMessageToSandbox;
