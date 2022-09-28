import {
  createHandleMessageFromView,
  getComponents,
  getComponentSets,
  postMessageToView,
} from '@hashi/sandbox-features';

figma.showUI(__html__, { themeColors: true, width: 1024, height: 576 });

postMessageToView({
  type: 'setComponentSets',
  payload: getComponentSets(),
});

postMessageToView({
  type: 'setComponents',
  payload: getComponents(),
});

// figma.ui.onmessage = createHandleMessageFromView(console.log);
