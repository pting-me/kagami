import { handleMessage } from "./messaging/handleMessage";

const { x: x0, y: y0, height: h0 } = figma.viewport.bounds;

const uiOptions: ShowUIOptions = {
  themeColors: true,
  width: 384,
  height: Math.round(h0 * figma.viewport.zoom - 96),
  position: {
    x: Math.round(x0 + 16 / figma.viewport.zoom),
    y: Math.round(y0 + 16 / figma.viewport.zoom),
  },
};

figma.showUI(__html__, uiOptions);

figma.ui.onmessage = handleMessage;
