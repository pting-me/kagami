import {
  createHandleMessageFromView,
  createLogger,
  focusNode,
  getComponentNodes,
  getComponentSetNodes,
  postMessageToView,
} from '@kagami/sandbox-features';
import type { Message } from '@kagami/types';

import { environment } from './environments/environment';

const logger = createLogger(environment);

logger.log('Sandbox is in development mode.');

figma.showUI(__html__, { themeColors: true, width: 240, height: 427 });

const componentSetNodes = getComponentSetNodes();

postMessageToView({
  type: 'setComponentSetNodes',
  payload: getComponentSetNodes(),
});

postMessageToView({
  type: 'setComponentNodes',
  payload: getComponentNodes(),
});

logger.log(componentSetNodes);
const primaryButton = componentSetNodes[3].children[1];
logger.log(primaryButton.fillStyleId);
if (typeof primaryButton.fillStyleId === 'symbol') {
  logger.log('mixed');
} else {
  logger.log(figma.getStyleById(primaryButton.fillStyleId));
}

figma.ui.onmessage = createHandleMessageFromView((message: Message) => {
  switch (message.type) {
    case 'focusNode': {
      const { payload } = message;
      const { id } = payload as Partial<ComponentNode>;
      logger.log(figma.getNodeById(id));
      focusNode({ id });
      break;
    }
    default:
  }
});
