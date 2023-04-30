import { handleMessage } from "./messaging/handleMessage";
import { sendMessage } from "./messaging/sendMessage";
import { getComponentSetNodes } from "./nodes/getComponentSetNodes";

const { x: x0, y: y0, height: h0 } = figma.viewport.bounds;

const uiOptions: ShowUIOptions = {
  themeColors: true,
  width: 240,
  height: Math.round(h0 - 96),
  position: { x: Math.round(x0 + 16), y: Math.round(y0 + 16) },
};

figma.showUI(__html__, uiOptions);

figma.ui.onmessage = handleMessage;

// figma.on("selectionchange", handleSelectionChange);
const componentSetNodes = getComponentSetNodes();
console.log(componentSetNodes);

sendMessage({
  type: "nodes/updateComponentSets",
  payload: componentSetNodes,
});

// console.log(getComponentNodes());
// console.log(getComponentSetNodes());
