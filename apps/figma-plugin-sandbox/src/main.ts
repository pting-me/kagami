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
import type { MessageFromView } from '@kagami/types';

import { environment } from './environments/environment';

const logger = createLogger(environment);

logger.log('Sandbox is in development mode.');

const { x: x0, y: y0, height: h0 } = figma.viewport.bounds;

const uiOptions: ShowUIOptions = {
  themeColors: true,
  width: 320,
  height: h0 - 96,
  position: { x: x0 + 16, y: y0 + 16 },
};

figma.showUI(__html__, uiOptions);

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

figma.ui.onmessage = createHandleMessageFromView((message: MessageFromView) => {
  const { type, payload } = message;
  switch (type) {
    case 'focusNode': {
      const { id } = payload as Partial<ComponentNode>;
      logger.log(figma.getNodeById(id));
      focusNode({ id });
      break;
    }
    case 'generateCode': {
      const { id } = payload as Partial<ComponentSetNode>;
      const node = figma.getNodeById(id);

      if (!node || !isComponentSetNode(node)) {
        postMessageToView({
          type: 'setDownloadInfo',
          payload: { download: false, filename: 'NO_DATA', content: '' },
        });
      } else {
        const filename = `${upperFirst(camelCase(node.name))}.tsx`;
        const content = generateCode(node);
        postMessageToView({
          type: 'setDownloadInfo',
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
