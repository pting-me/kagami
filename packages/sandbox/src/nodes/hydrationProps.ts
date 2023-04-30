const baseProps = ["name", "type"] as const;

export const componentProps = [
  ...baseProps,
  "variantProperties",

  // fills
  "fillStyleId",
  "fills",

  // strokes
  "strokeStyleId",
  "strokes",
  "strokeTopWeight",
  "strokeRightWeight",
  "strokeBottomWeight",
  "strokeLeftWeight",
  // TODO support strokeJoin
  // This seems to be SVG only
  // 'strokeJoin',

  // border radius
  "topLeftRadius",
  "topRightRadius",
  "bottomRightRadius",
  "bottomLeftRadius",

  // padding
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",

  "effectStyleId",
  "gridStyleId",
] as const;

export const componentSetProps = [
  ...baseProps,
  "children",
  "variantGroupProperties",
] as const;

// Leave these here for type checking purposes only
/* eslint-disable @typescript-eslint/no-unused-vars */
const checkBase: readonly (keyof BaseNode)[] = baseProps;
const checkComponent: readonly (keyof ComponentNode)[] = componentProps;
const checkComponentSet: readonly (keyof ComponentSetNode)[] =
  componentSetProps;
/* eslint-enable @typescript-eslint/no-unused-vars */
