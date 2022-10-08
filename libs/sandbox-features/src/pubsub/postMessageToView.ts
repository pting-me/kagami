import { MessageToView } from '@kagami/types';

/**
 * Publishes a message to the view
 */
const postMessageToView = (pluginMessage: MessageToView) => {
  figma.ui.postMessage(pluginMessage);
};

export default postMessageToView;
