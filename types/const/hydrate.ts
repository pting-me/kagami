const hydrateBaseProps = ['name', 'type'] as const;

export const hydrateComponentProps = [
  ...hydrateBaseProps,
  'variantProperties',

  // fills
  'fillStyleId',
  'fills',

  // strokes
  'strokeStyleId',
  'strokes',
  'strokeTopWeight',
  'strokeRightWeight',
  'strokeBottomWeight',
  'strokeLeftWeight',
  // TODO support strokeJoin
  // This seems to be SVG only
  // 'strokeJoin',

  // border radius
  'topLeftRadius',
  'topRightRadius',
  'bottomRightRadius',
  'bottomLeftRadius',

  // padding
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  'effectStyleId',
  'gridStyleId',
] as const;

export const hydrateComponentSetProps = [
  ...hydrateBaseProps,
  'children',
  'variantGroupProperties',
] as const;

// Leave these here for type checking purposes only
const checkBase: readonly (keyof BaseNode)[] = hydrateBaseProps;
const checkComponent: readonly (keyof ComponentNode)[] = hydrateComponentProps;
const checkComponentSet: readonly (keyof ComponentSetNode)[] =
  hydrateComponentSetProps;
