import {
  createHandleMessageFromView,
  focusNode,
  getComponentNodes,
  getComponentSetNodes,
  postMessageToView,
} from '@kagami/sandbox-features';
import type { Message } from '@kagami/types';

figma.showUI(__html__, { themeColors: true, width: 240, height: 427 });

postMessageToView({
  type: 'setComponentSetNodes',
  payload: getComponentSetNodes(),
});

postMessageToView({
  type: 'setComponentNodes',
  payload: getComponentNodes(),
});

figma.ui.onmessage = createHandleMessageFromView((message: Message) => {
  switch (message.type) {
    case 'focusNode': {
      const { payload } = message;
      console.log(payload);
      focusNode(payload as { id: string });
      break;
    }
    default:
  }
});
