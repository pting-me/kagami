const { x: x0, y: y0, height: h0 } = figma.viewport.bounds;

const uiOptions: ShowUIOptions = {
  themeColors: true,
  width: 320,
  height: Math.round(h0 - 96),
  position: { x: Math.round(x0 + 16), y: Math.round(y0 + 16) },
};

figma.showUI(__html__, uiOptions);
