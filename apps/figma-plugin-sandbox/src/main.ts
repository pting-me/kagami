import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';

import {
  createHandleMessageFromView,
  createLogger,
  focusNode,
  generateCode,
  getComponentNodes,
  getComponentSetNodes,
  postMessageToView,
} from '@kagami/sandbox-features';
import type { Message } from '@kagami/types';

import { environment } from './environments/environment';

const logger = createLogger(environment);

logger.log('Sandbox is in development mode.');

figma.showUI(__html__, { themeColors: true, width: 240, height: 427 });

postMessageToView({
  type: 'setComponentSetNodes',
  payload: getComponentSetNodes(),
});

postMessageToView({
  type: 'setComponentNodes',
  payload: getComponentNodes(),
});

const isComponentSetNode = (node: BaseNode): node is ComponentSetNode => {
  return node.type === 'COMPONENT_SET';
};

figma.ui.onmessage = createHandleMessageFromView((message: Message) => {
  switch (message.type) {
    case 'focusNode': {
      const { payload } = message;
      const { id } = payload as Partial<ComponentNode>;
      logger.log(figma.getNodeById(id));
      focusNode({ id });
      break;
    }
    case 'generateCode': {
      const { payload } = message;
      const { id } = payload as Partial<ComponentSetNode>;
      const node = figma.getNodeById(id);

      if (!node || !isComponentSetNode(node)) {
        postMessageToView({
          type: 'setFileInfo',
          payload: { download: false, filename: 'NO_DATA', content: '' },
        });
      } else {
        const filename = `${upperFirst(camelCase(node.name))}.tsx`;
        const content = generateCode(node);
        postMessageToView({
          type: 'setFileInfo',
          payload: {
            download: true,
            filename,
            content,
          },
        });
      }
      break;
    }
    default:
  }
});
