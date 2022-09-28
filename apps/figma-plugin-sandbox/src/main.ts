import {
  createHandleMessageFromView,
  getComponentNodes,
  getComponentSetNodes,
  postMessageToView,
} from '@hashi/sandbox-features';

figma.showUI(__html__, { themeColors: true, width: 1024, height: 576 });

postMessageToView({
  type: 'setComponentSetNodes',
  payload: getComponentSetNodes(),
});

postMessageToView({
  type: 'setComponentNodes',
  payload: getComponentNodes(),
});

figma.ui.onmessage = createHandleMessageFromView(console.log);
